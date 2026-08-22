package com.lastwave.app.data.network

import android.os.SystemClock
import java.util.concurrent.locks.LockSupport
import javax.inject.Inject
import javax.inject.Singleton
import kotlinx.coroutines.delay

/**
 * Process-wide shield against Last.fm rate limiting (HTTP 429 / API error 29).
 *
 * Historically the app tripped Last.fm's ~5 req/s per-IP limit every few
 * minutes of normal use (Home fires 4-7 parallel reads per poll, Discover
 * refills launch ~11 parallel calls, artwork resolution races providers, and
 * both scrobblers add signed writes on top). A single 429 then flipped a
 * process-wide kill switch in ScrobbleRepository that instantly failed every
 * scrobble/now-playing call for 30s+ — repeatedly re-armed by queued retries,
 * which is exactly the "core stops working for 1-2 minutes, then comes back"
 * report.
 *
 * This class replaces that failure mode with two proactive mechanisms:
 *
 * 1. PACING — a token-slot spacing so requests to ws.audioscrobbler.com never
 *    START closer together than [MIN_REQUEST_INTERVAL_MS]. Bursts are spread
 *    out instead of fired in parallel, which prevents us from tripping the
 *    limit in the first place.
 *
 * 2. ADAPTIVE COOLDOWN — when a 429/error-29 is observed anyway, all guarded
 *    traffic pauses for a jittered exponential backoff ([INITIAL_COOLDOWN_MS]
 *    doubling up to [MAX_COOLDOWN_MS]) and the affected request is retried ONCE
 *    transparently after the cooldown clears. Callers neither see errors nor
 *    lose data; consecutive hits escalate, sustained success de-escalates.
 */
@Singleton
class LastFmRateGuard @Inject constructor() {

    private val lock = Any()

    /** Next scheduled request-start time (System.nanoTime based). */
    private var nextSlotNanos: Long = 0L

    /** SystemClock.elapsedRealtime until which all Last.fm traffic should pause. */
    private var cooldownUntilElapsed: Long = 0L

    private var consecutiveLimitHits: Int = 0
    private var lastLimitedAtElapsed: Long = 0L

    /** Remaining cooldown in ms; 0 when clear. */
    val cooldownRemainingMs: Long
        get() = synchronized(lock) {
            (cooldownUntilElapsed - SystemClock.elapsedRealtime()).coerceAtLeast(0L)
        }

    /** Called by the network layer whenever Last.fm signals rate limiting. */
    fun onRequestLimited() {
        synchronized(lock) {
            consecutiveLimitHits = (consecutiveLimitHits + 1).coerceAtMost(8)
            val escalated = INITIAL_COOLDOWN_MS shl (consecutiveLimitHits - 1).coerceAtMost(4)
            val jitter = (0..JITTER_MS).random()
            cooldownUntilElapsed = SystemClock.elapsedRealtime() +
                escalated.coerceAtMost(MAX_COOLDOWN_MS) + jitter
            lastLimitedAtElapsed = cooldownUntilElapsed
        }
    }

    /** Called on any successful Last.fm response; slowly de-escalates backoff. */
    fun onRequestSucceeded() {
        synchronized(lock) {
            if (cooldownUntilElapsed <= SystemClock.elapsedRealtime() &&
                SystemClock.elapsedRealtime() - lastLimitedAtElapsed > DEESCALATION_AFTER_MS
            ) {
                consecutiveLimitHits = 0
            }
        }
    }

    /**
     * Blocks the calling thread until a paced request slot opens, guaranteeing
     * minimum spacing between Last.fm request starts across ALL threads.
     * Intended for OkHttp interceptor threads only; suspend callers should use
     * [suspendAwaitClearance] instead. Never blocks longer than roughly one
     * spacing interval times the number of concurrent claimants.
     */
    fun paceOutBlocking() {
        while (true) {
            val slot: Long
            synchronized(lock) {
                val now = System.nanoTime()
                slot = maxOf(nextSlotNanos, now)
                nextSlotNanos = slot + MIN_REQUEST_INTERVAL_MS * 1_000_000L
            }
            val waitNanos = slot - System.nanoTime()
            if (waitNanos <= 0L) return
            LockSupport.parkNanos(waitNanos)
        }
    }

    /**
     * Blocking wait until the adaptive cooldown fully clears. Returns true if
     * cleared within [maxWaitMs], false if the caller should give up waiting
     * (and degrade gracefully) rather than pile onto the paused host.
     * Interceptor threads only.
     */
    fun awaitClearanceBlocking(maxWaitMs: Long): Boolean {
        val deadline = SystemClock.elapsedRealtime() + maxWaitMs
        while (true) {
            val remaining = cooldownRemainingMs
            if (remaining <= 0L) return true
            val now = SystemClock.elapsedRealtime()
            if (now + remaining > deadline) return false
            LockSupport.parkNanos(minOf(remaining, 200L) * 1_000_000L)
        }
    }

    /**
     * Suspend-friendly variant of [awaitClearanceBlocking] used by write paths
     * (scrobble / updateNowPlaying). These run on background IO coroutines, so
     * waiting out a short cooldown keeps the scrobble alive instead of failing
     * it into a retry queue.
     */
    suspend fun suspendAwaitClearance(maxWaitMs: Long): Boolean {
        val deadline = SystemClock.elapsedRealtime() + maxWaitMs
        while (true) {
            val remaining = cooldownRemainingMs
            if (remaining <= 0L) return true
            if (SystemClock.elapsedRealtime() + remaining > deadline) return false
            delay(minOf(remaining, 250L))
        }
    }

    private companion object {
        /** ~4.3 req/s sustained start-rate; under Last.fm's documented 5 req/s. */
        const val MIN_REQUEST_INTERVAL_MS = 230L

        const val INITIAL_COOLDOWN_MS = 6_000L
        const val MAX_COOLDOWN_MS = 90_000L
        const val JITTER_MS = 1_500
        const val DEESCALATION_AFTER_MS = 60_000L
    }
}
