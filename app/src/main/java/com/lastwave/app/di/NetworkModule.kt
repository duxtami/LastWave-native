package com.lastwave.app.di

import android.content.Context
import com.lastwave.app.data.network.LastFmApiService
import com.lastwave.app.data.network.LastFmRateGuard
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import java.io.File
import java.util.concurrent.TimeUnit
import okhttp3.Cache
import okhttp3.ConnectionPool
import okhttp3.Dispatcher
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Protocol
import okhttp3.Request
import okhttp3.Response
import okhttp3.ResponseBody
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    private const val HTTP_CACHE_SIZE = 25L * 1024 * 1024 // 25 MB cache
    private const val BROWSER_USER_AGENT =
        "Mozilla/5.0 (Linux; Android 14; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36 LastWave/1.0"

    /** Max time ANY Last.fm read will wait inside the app for an active
     *  rate-limit cooldown to clear before failing fast into caches/fallbacks. */
    private const val READ_COOLDOWN_WAIT_MS = 10_000L

    /** How long a limited request may wait for cooldown clearance before its
     *  single transparent retry is abandoned (still surfaces as 429). */
    private const val RETRY_COOLDOWN_WAIT_MS = 15_000L

    /** Last.fm returns HTTP 200 with {"error":29,...} when rate limited. */
    private val ERROR_29_REGEX = Regex(""""error"\s*:\s*29(?!\d)""")

    @Provides
    @Singleton
    fun provideOkHttpClient(
        @ApplicationContext context: Context,
        rateGuard: LastFmRateGuard,
    ): OkHttpClient {
        val logging = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BASIC
        }

        // Pacing dispatcher: raised headroom so parallel artwork/racer/stream
        // lookups don't queue behind parked Last.fm requests. Last.fm's own
        // 5 req/s limit is enforced per-request by LastFmRateGuard pacing,
        // not by this cap.
        val dispatcher = Dispatcher().apply {
            maxRequests = 64
            maxRequestsPerHost = 12
        }

        val cacheDir = File(context.cacheDir, "lfm_http_cache")
        val cache = Cache(cacheDir, HTTP_CACHE_SIZE)

        return OkHttpClient.Builder()
            .dispatcher(dispatcher)
            .cache(cache)
            .connectionPool(ConnectionPool(10, 5, TimeUnit.MINUTES))
            .connectTimeout(8, TimeUnit.SECONDS)
            .readTimeout(8, TimeUnit.SECONDS)
            .writeTimeout(8, TimeUnit.SECONDS)
            .retryOnConnectionFailure(true)
            // 1. Browser User-Agent and headers to prevent Cloudflare bot
            //     blocking — but only as a DEFAULT. NewPipe's downloader and
            //     the InnerTube player clients set their own (desktop/VR/iOS)
            //     User-Agents on purpose; clobbering those made every YouTube
            //     request look like Android Chrome and invited 403 bot-walls.
            .addInterceptor { chain ->
                val original = chain.request()
                if (original.header("User-Agent") != null) {
                    chain.proceed(original)
                } else {
                    val request = original.newBuilder()
                        .header("User-Agent", BROWSER_USER_AGENT)
                        .header("Accept", "application/json, text/plain, */*")
                        .header("Accept-Language", "en-US,en;q=0.9")
                        .build()
                    chain.proceed(request)
                }
            }
            // 1b. Last.fm rate shield — pace every request start, absorb
            //     429/error-29 with one transparent post-cooldown retry.
            .addInterceptor { chain ->
                val request = chain.request()
                if (!request.url.host.endsWith("audioscrobbler.com", ignoreCase = true)) {
                    chain.proceed(request)
                } else {
                    proceedGuardedLastFm(chain, request, rateGuard)
                }
            }
            // 2. Cache Last.fm GETs for 10 minutes (mirrors web app.js _CACHE_TTL).
            //     Scoped to Last.fm ONLY: applying it to every host also served
            //     10-minute-old YouTube watch/player pages whose expiring stream
            //     URLs had already died — a classic "playback randomly fails"
            //     source.
            .addNetworkInterceptor { chain ->
                val request = chain.request()
                val response = chain.proceed(request)
                val isLastFm = request.url.host.endsWith("audioscrobbler.com", ignoreCase = true)
                if (isLastFm && request.method.equals("GET", ignoreCase = true) && response.isSuccessful) {
                    response.newBuilder()
                        .removeHeader("Pragma")
                        .removeHeader("Cache-Control")
                        .header("Cache-Control", "public, max-age=600")
                        .build()
                } else {
                    response
                }
            }
            .addInterceptor(logging)
            .build()
    }

    /**
     * The heart of "never breaks": instead of letting bursts of parallel reads
     * hammer Last.fm until a 429 freezes scrobbling for minutes, every request
     * to ws.audioscrobbler.com is (a) spaced out by the shared pacer, (b) held
     * briefly if a cooldown from an earlier limit hit is active, and (c) retried
     * exactly once, transparently, after the cooldown clears — so callers see a
     * normal response in the overwhelmingly common case.
     */
    private fun proceedGuardedLastFm(
        chain: Interceptor.Chain,
        request: Request,
        rateGuard: LastFmRateGuard,
    ): Response {
        rateGuard.paceOutBlocking()

        // Cooldown from an earlier hit still running? Wait a bounded amount;
        // if it's a long one, fail fast so repositories fall back to their
        // HTTP caches / secondary providers instead of hanging the UI.
        if (!rateGuard.awaitClearanceBlocking(READ_COOLDOWN_WAIT_MS)) {
            return syntheticLimited(request)
        }

        val response = chain.proceed(request)

        if (response.code == 429 || response.code == 503) {
            response.closeQuietly()
            return recoverAndRetryOnce(chain, request, rateGuard)
        }

        if (response.isSuccessful) {
            val peeked = runCatching { response.peekBody(512).string() }.getOrDefault("")
            if (ERROR_29_REGEX.containsMatchIn(peeked)) {
                response.closeQuietly()
                return recoverAndRetryOnce(chain, request, rateGuard)
            }
            rateGuard.onRequestSucceeded()
        }
        return response
    }

    /** Single transparent retry after the adaptive cooldown clears. */
    private fun recoverAndRetryOnce(
        chain: Interceptor.Chain,
        request: Request,
        rateGuard: LastFmRateGuard,
    ): Response {
        rateGuard.onRequestLimited()
        if (!rateGuard.awaitClearanceBlocking(RETRY_COOLDOWN_WAIT_MS)) {
            return syntheticLimited(request)
        }
        rateGuard.paceOutBlocking()
        val retried = chain.proceed(request)
        if (retried.code != 429 && retried.code != 503 &&
            !(retried.isSuccessful && ERROR_29_REGEX.containsMatchIn(
                runCatching { retried.peekBody(512).string() }.getOrDefault(""),
            ))
        ) {
            if (retried.isSuccessful) rateGuard.onRequestSucceeded()
            return retried
        }
        // Still limited after one retry — surface it; the next caller-triggered
        // attempt will wait out the (now escalated) cooldown up front.
        return retried
    }

    /** A well-formed 429 the rest of the pipeline already knows how to handle. */
    private fun syntheticLimited(request: Request): Response = Response.Builder()
        .request(request)
        .protocol(Protocol.HTTP_1_1)
        .code(429)
        .message("LastWave client-side rate shield")
        .body(ResponseBody.create(null, ""))
        .build()

    private fun Response.closeQuietly() {
        runCatching { close() }
    }

    @Provides
    @Singleton
    fun provideRetrofit(client: OkHttpClient): Retrofit =
        Retrofit.Builder()
            .baseUrl(LastFmApiService.BASE_URL)
            .client(client)
            .build()

    @Provides
    @Singleton
    fun provideLastFmApiService(retrofit: Retrofit): LastFmApiService =
        retrofit.create(LastFmApiService::class.java)
}
