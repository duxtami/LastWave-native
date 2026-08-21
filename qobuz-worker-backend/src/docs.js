/**
 * Qobuz Engine - Audiophile API Documentation & Architecture Reference
 * Mobile-Optimized, Responsive, and Developer-First
 */

export function renderDocsHtml(workerUrl = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>Qobuz Engine • API Documentation & Reference</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180' fill='%23000000'%3E%3Cmask height='180' id='mask0' maskUnits='userSpaceOnUse' width='180' x='0' y='0'%3E%3Ccircle cx='90' cy='90' fill='%23000000' r='90'/%3E%3C/mask%3E%3Cg mask='url(%23mask0)'%3E%3Ccircle cx='90' cy='90' fill='%23000000' r='90' stroke='%2300f2fe' stroke-width='8'/%3E%3Cpath d='M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z' fill='%23ffffff'/%3E%3Crect fill='%2300f2fe' height='72' width='12' x='115' y='54'/%3E%3C/g%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #030712;
      --card: rgba(13, 19, 38, 0.72);
      --border: rgba(255, 255, 255, 0.08);
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --cyan: #00f2fe;
      --cyan-glow: rgba(0, 242, 254, 0.35);
      --purple: #a855f7;
      --emerald: #10b981;
      --gold: #fbbf24;
      --radius: 12px;
      --radius-sm: 8px;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif; -webkit-tap-highlight-color: transparent; }

    html, body {
      width: 100%;
      max-width: 100vw;
      overflow-x: hidden;
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      min-height: 100vh;
      min-height: -webkit-fill-available;
      display: flex;
      flex-direction: column;
      -webkit-font-smoothing: antialiased;
      position: relative;
      padding-bottom: 60px;
    }

    #starCanvas {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none;
      z-index: 0;
    }

    .nebula {
      position: fixed;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
      z-index: 0;
      opacity: 0.22;
    }
    .nebula-1 { top: -10%; left: 20%; width: clamp(260px, 40vw, 500px); height: clamp(260px, 40vw, 500px); background: radial-gradient(circle, var(--cyan) 0%, transparent 70%); }
    .nebula-2 { bottom: 10%; right: 15%; width: clamp(280px, 45vw, 550px); height: clamp(280px, 45vw, 550px); background: radial-gradient(circle, var(--purple) 0%, transparent 70%); }

    .container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1020px;
      margin: 0 auto;
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    header {
      position: sticky;
      top: 0;
      z-index: 60;
      background: rgba(3, 7, 18, 0.82);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      width: 100%;
    }
    .nav-inner {
      max-width: 1020px;
      margin: 0 auto;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: inherit;
    }
    .brand-logo-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 9px;
      background: linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(168, 85, 247, 0.2));
      border: 1px solid rgba(0, 242, 254, 0.3);
      box-shadow: 0 0 14px var(--cyan-glow);
      flex-shrink: 0;
    }
    .brand-title {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: -0.3px;
      color: #fff;
      white-space: nowrap;
    }
    .brand-subtitle {
      font-size: 9.5px;
      font-weight: 600;
      color: var(--cyan);
      letter-spacing: 0.6px;
      font-family: 'JetBrains Mono', monospace;
    }
    .nav-actions { display: flex; align-items: center; gap: 8px; }
    .nav-btn {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      text-decoration: none;
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      transition: all 0.2s;
    }
    .nav-btn:hover { color: #fff; background: rgba(255, 255, 255, 0.06); border-color: var(--border); }
    .nav-btn.active { color: #fff; background: rgba(0, 242, 254, 0.12); border-color: rgba(0, 242, 254, 0.3); box-shadow: 0 0 12px rgba(0, 242, 254, 0.2); }

    .glass-panel {
      background: var(--card);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .doc-heading {
      font-size: clamp(16px, 3.5vw, 18px);
      font-weight: 800;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .doc-text {
      color: var(--text-muted);
      font-size: 13.5px;
      line-height: 1.55;
    }

    .endpoint-card {
      background: rgba(3, 7, 18, 0.7);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      min-width: 0;
    }
    .endpoint-top {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .method {
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 11px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      background: rgba(0, 242, 254, 0.15);
      border: 1px solid rgba(0, 242, 254, 0.3);
      color: var(--cyan);
      flex-shrink: 0;
    }
    .route-path {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12.5px;
      font-weight: 600;
      color: #fff;
      word-break: break-all;
    }
    .route-desc {
      font-size: 12.5px;
      color: var(--text-muted);
      line-height: 1.45;
    }
    .code-block {
      background: rgba(2, 6, 18, 0.9);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 10px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11.5px;
      color: #e2e8f0;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      line-height: 1.45;
      word-break: break-all;
    }

    .table-container {
      width: 100%;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .quality-table {
      width: 100%;
      min-width: 480px;
      border-collapse: collapse;
      font-size: 12.5px;
      margin-top: 4px;
    }
    .quality-table th, .quality-table td {
      padding: 9px 12px;
      border: 1px solid var(--border);
      text-align: left;
    }
    .quality-table th {
      background: rgba(5, 10, 24, 0.6);
      color: #fff;
      font-weight: 700;
    }
    .quality-table td {
      background: rgba(3, 7, 18, 0.4);
      color: var(--text-muted);
    }

    .badge-pill {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 600;
    }
    .badge-gold { background: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.3); color: var(--gold); }
    .badge-cyan { background: rgba(0, 242, 254, 0.15); border: 1px solid rgba(0, 242, 254, 0.3); color: var(--cyan); }

    @media (max-width: 640px) {
      .container { padding: 0 10px; gap: 14px; }
      .nav-inner { padding: 8px 12px; }
      .brand-subtitle { display: none; }
      .glass-panel { padding: 14px; gap: 12px; }
      .endpoint-card { padding: 12px; }
    }
  </style>
</head>
<body>
  <canvas id="starCanvas"></canvas>
  <div class="nebula nebula-1"></div>
  <div class="nebula nebula-2"></div>

  <header>
    <div class="nav-inner">
      <a href="/" class="brand">
        <div class="brand-logo-wrap">
          <svg style="width:20px;height:20px;" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90" cy="90" fill="#000000" r="90" stroke="#00f2fe" stroke-width="8"/>
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="#ffffff"/>
            <rect fill="#00f2fe" height="72" width="12" x="115" y="54"/>
          </svg>
        </div>
        <div>
          <div class="brand-title">QOBUZ ENGINE</div>
          <div class="brand-subtitle">Documentation & API Spec</div>
        </div>
      </a>
      <div class="nav-actions">
        <a href="/" class="nav-btn">Console</a>
        <a href="/docs" class="nav-btn active">Docs</a>
      </div>
    </div>
  </header>

  <div class="container" style="margin-top: 18px;">
    <!-- Architecture Overview -->
    <div class="glass-panel">
      <h2 class="doc-heading">🚀 Architecture & Principles</h2>
      <p class="doc-text">
        Qobuz Engine is a serverless edge backend and developer playground designed for ultra-high-fidelity streaming. It reproduces full <code style="color:var(--cyan);">vitiko98/qobuz-dl</code> parity on Cloudflare Workers with dynamic web token extraction, HMAC request signing, Akamai direct CDN delivery, and ID3/Vorbis tag parsing.
      </p>
    </div>

    <!-- Supported Audio Format Qualities -->
    <div class="glass-panel">
      <h2 class="doc-heading">💎 Audio Format Qualities</h2>
      <div class="table-container">
        <table class="quality-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Format</th>
              <th>Bit Depth & Rate</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="badge-pill badge-gold">27</span></td>
              <td>FLAC</td>
              <td>24-Bit / 192 kHz</td>
              <td>Hi-Res Master Audio (Studio Master)</td>
            </tr>
            <tr>
              <td><span class="badge-pill badge-gold">7</span></td>
              <td>FLAC</td>
              <td>24-Bit / ≤ 96 kHz</td>
              <td>Hi-Res Studio Quality</td>
            </tr>
            <tr>
              <td><span class="badge-pill badge-cyan">6</span></td>
              <td>FLAC</td>
              <td>16-Bit / 44.1 kHz</td>
              <td>CD Lossless Redbook</td>
            </tr>
            <tr>
              <td><span class="badge-pill">5</span></td>
              <td>MP3</td>
              <td>320 kbps CBR</td>
              <td>High Quality Compressed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Catalog API Endpoints -->
    <div class="glass-panel">
      <h2 class="doc-heading">🔍 Catalog & Metadata Endpoints</h2>
      
      <div class="endpoint-card">
        <div class="endpoint-top">
          <span class="method">GET</span>
          <span class="route-path">/api/search?q={query}&type={track|album|artist|playlist}&limit={20}</span>
        </div>
        <p class="route-desc">Performs full-text search across Qobuz's lossless catalog.</p>
        <div class="code-block">curl -X GET "${workerUrl}/api/search?q=Daft+Punk&type=track&limit=5"</div>
      </div>

      <div class="endpoint-card">
        <div class="endpoint-top">
          <span class="method">GET</span>
          <span class="route-path">/api/track/:id</span>
        </div>
        <p class="route-desc">Retrieves detailed track metadata including ISRC, composer, sampling rate, bit depth, and album cover.</p>
      </div>

      <div class="endpoint-card">
        <div class="endpoint-top">
          <span class="method">GET</span>
          <span class="route-path">/api/album/:id</span>
        </div>
        <p class="route-desc">Fetches full album metadata with tracklist and discography information.</p>
      </div>

      <div class="endpoint-card">
        <div class="endpoint-top">
          <span class="method">GET</span>
          <span class="route-path">/api/resolve?url={qobuz_url_or_id}</span>
        </div>
        <p class="route-desc">Smart URL resolver. Automatically parses any Qobuz web URL (track, album, artist, playlist) and resolves target metadata.</p>
      </div>
    </div>

    <!-- Downloader & Stream Endpoints -->
    <div class="glass-panel">
      <h2 class="doc-heading">⚡ Streaming & Downloader Endpoints</h2>

      <div class="endpoint-card">
        <div class="endpoint-top">
          <span class="method">GET</span>
          <span class="route-path">/api/track/:id/url?quality={5|6|7|27}</span>
        </div>
        <p class="route-desc">Generates a signed direct Akamai CDN URL for instant streaming.</p>
      </div>

      <div class="endpoint-card">
        <div class="endpoint-top">
          <span class="method">GET</span>
          <span class="route-path">/api/download/track/:id?quality={5|6|7|27}</span>
        </div>
        <p class="route-desc">Proxies lossless FLAC/MP3 stream with clean content-disposition filenames.</p>
      </div>

      <div class="endpoint-card">
        <div class="endpoint-top">
          <span class="method">GET</span>
          <span class="route-path">/api/download/album/:id?quality={5|6|7|27}</span>
        </div>
        <p class="route-desc">Generates complete album manifest with signed URLs for every track.</p>
      </div>

      <div class="endpoint-card">
        <div class="endpoint-top">
          <span class="method">GET</span>
          <span class="route-path">/api/download/m3u?type={album|playlist}&id={id}&quality={5|6|7|27}</span>
        </div>
        <p class="route-desc">Generates an instant standard .m3u8 playlist file containing lossless stream URLs.</p>
      </div>
    </div>
  </div>

  <script>
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isMobile = window.innerWidth < 768;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
    }
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', () => setTimeout(resize, 200));

    const stars = Array.from({ length: isMobile ? 50 : 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      color: Math.random() > 0.8 ? '#00f2fe' : '#ffffff'
    }));

    function loop() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, s.alpha));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(loop);
    }
    loop();
  </script>
</body>
</html>`;
}
