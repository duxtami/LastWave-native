package com.lastwave.app.data.download

import android.util.Log
import okhttp3.OkHttpClient
import okhttp3.Request
import org.jaudiotagger.audio.AudioFileIO
import org.jaudiotagger.tag.FieldKey
import org.jaudiotagger.tag.images.ArtworkFactory
import java.io.File
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class AudioTagWriter @Inject constructor(
    private val okHttpClient: OkHttpClient,
) {
    companion object {
        private const val TAG = "AudioTagWriter"
    }

    /**
     * Embeds metadata (Title, Artist, Album) and cover art directly into the audio file container.
     */
    fun embedMetadata(
        audioFile: File,
        title: String,
        artist: String,
        album: String? = null,
        artworkUrl: String? = null,
    ) {
        if (!audioFile.exists() || audioFile.length() <= 0) return

        var tempArtworkFile: File? = null
        try {
            // 1. If artwork URL provided, download temporary image for embedding
            if (!artworkUrl.isNullOrBlank()) {
                tempArtworkFile = downloadArtworkTemp(artworkUrl, audioFile.parentFile ?: audioFile.canonicalFile.parentFile)
            }

            val audio = AudioFileIO.read(audioFile)
            val tag = audio.tagOrCreateAndSetDefault

            tag.setField(FieldKey.TITLE, title)
            tag.setField(FieldKey.ARTIST, artist)
            if (!album.isNullOrBlank()) {
                tag.setField(FieldKey.ALBUM, album)
            }

            if (tempArtworkFile != null && tempArtworkFile.exists() && tempArtworkFile.length() > 0) {
                runCatching {
                    val artwork = ArtworkFactory.createArtworkFromFile(tempArtworkFile)
                    tag.deleteArtworkField()
                    tag.setField(artwork)
                }.onFailure { e ->
                    Log.w(TAG, "Failed to create artwork tag for $title", e)
                }
            }

            audio.commit()
            Log.d(TAG, "Successfully embedded metadata & cover art in ${audioFile.name}")
        } catch (e: Throwable) {
            Log.w(TAG, "Could not embed tags into ${audioFile.name}: ${e.message}", e)
        } finally {
            tempArtworkFile?.delete()
        }
    }

    private fun downloadArtworkTemp(artworkUrl: String, parentDir: File?): File? {
        return try {
            val request = Request.Builder()
                .url(artworkUrl)
                .header("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36")
                .build()
            val response = okHttpClient.newCall(request).execute()
            if (response.isSuccessful) {
                val bytes = response.body?.bytes()
                if (bytes != null && bytes.isNotEmpty()) {
                    val tempFile = File.createTempFile("art_embed_", ".jpg", parentDir)
                    tempFile.writeBytes(bytes)
                    tempFile
                } else null
            } else null
        } catch (e: Exception) {
            Log.w(TAG, "Failed to download artwork for tagging from $artworkUrl", e)
            null
        }
    }
}
