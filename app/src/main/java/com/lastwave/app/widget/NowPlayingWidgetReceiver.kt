package com.lastwave.app.widget

import android.content.ComponentName
import android.content.Context
import android.os.Build
import android.service.notification.NotificationListenerService
import androidx.glance.appwidget.GlanceAppWidget
import androidx.glance.appwidget.GlanceAppWidgetReceiver
import com.lastwave.app.service.MediaScrobbleListenerService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.launch

private val widgetReceiverScope = CoroutineScope(SupervisorJob() + Dispatchers.Default)

abstract class LastWaveWidgetReceiver : GlanceAppWidgetReceiver() {
    override fun onEnabled(context: Context) {
        super.onEnabled(context)
        triggerSync(context)
    }

    override fun onUpdate(
        context: Context,
        appWidgetManager: android.appwidget.AppWidgetManager,
        appWidgetIds: IntArray,
    ) {
        super.onUpdate(context, appWidgetManager, appWidgetIds)
        triggerSync(context)
    }

    private fun triggerSync(context: Context) {
        val pendingResult = goAsync()
        widgetReceiverScope.launch {
            try {
                WidgetUpdater.sync(context.applicationContext)
            } finally {
                pendingResult.finish()
            }
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            runCatching {
                NotificationListenerService.requestRebind(
                    ComponentName(context, MediaScrobbleListenerService::class.java),
                )
            }
        }
    }
}

class NowPlayingWidgetReceiver : LastWaveWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = NowPlayingWidget()
}
