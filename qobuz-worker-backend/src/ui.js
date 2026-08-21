/**
 * Qobuz Engine - Ultra-Aesthetic Audiophile Console & API Playground
 * Fully Responsive & High-Performance Optimized for Mobile, Tablet & Desktop.
 * Features: Adaptive Starfall Canvas, Touch-Friendly Controls, Audio Visualizer,
 * Multi-Language SDK Generator, and Mobile-First Lossless Studio Deck.
 */

export function renderDashboardHtml(workerUrl = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>Qobuz Engine • Lossless Audiophile Console & API Playground</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180' fill='%23000000'%3E%3Cmask height='180' id='mask0' maskUnits='userSpaceOnUse' width='180' x='0' y='0'%3E%3Ccircle cx='90' cy='90' fill='%23000000' r='90'/%3E%3C/mask%3E%3Cg mask='url(%23mask0)'%3E%3Ccircle cx='90' cy='90' fill='%23000000' r='90' stroke='%2300f2fe' stroke-width='6'/%3E%3Cpath d='M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z' fill='%23ffffff'/%3E%3Crect fill='%2300f2fe' height='72' width='12' x='115' y='54'/%3E%3C/g%3E%3C/svg%3E">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #030712;
      --bg-surface: rgba(10, 15, 30, 0.75);
      --card: rgba(13, 19, 38, 0.72);
      --card-solid: #0d1326;
      --card-hover: rgba(22, 32, 60, 0.85);
      --border: rgba(255, 255, 255, 0.09);
      --border-focus: rgba(0, 242, 254, 0.5);
      --border-subtle: rgba(255, 255, 255, 0.04);
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --text-dim: #64748b;
      --cyan: #00f2fe;
      --cyan-glow: rgba(0, 242, 254, 0.35);
      --blue: #38bdf8;
      --purple: #a855f7;
      --purple-glow: rgba(168, 85, 247, 0.35);
      --emerald: #10b981;
      --gold: #fbbf24;
      --gold-glow: rgba(251, 191, 36, 0.4);
      --rose: #f43f5e;
      --radius: 12px;
      --radius-sm: 8px;
      --radius-full: 9999px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      -webkit-tap-highlight-color: transparent;
    }

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
    }

    /* Starfall Cosmic Canvas */
    #starCanvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
    }

    /* Ambient Nebulae Background Glows */
    .nebula {
      position: fixed;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
      z-index: 0;
      opacity: 0.25;
      animation: pulseGlow 14s ease-in-out infinite alternate;
    }
    .nebula-1 {
      top: -10%;
      left: 15%;
      width: clamp(280px, 40vw, 500px);
      height: clamp(280px, 40vw, 500px);
      background: radial-gradient(circle, var(--cyan) 0%, rgba(0, 242, 254, 0) 70%);
    }
    .nebula-2 {
      bottom: 5%;
      right: 10%;
      width: clamp(300px, 45vw, 600px);
      height: clamp(300px, 45vw, 600px);
      background: radial-gradient(circle, var(--purple) 0%, rgba(168, 85, 247, 0) 70%);
      animation-delay: -7s;
    }

    @keyframes pulseGlow {
      0% { transform: scale(1) translateY(0); opacity: 0.18; }
      50% { transform: scale(1.15) translateY(15px); opacity: 0.28; }
      100% { transform: scale(0.95) translateY(-10px); opacity: 0.2; }
    }

    .container {
      position: relative;
      z-index: 1;
      width: 100%;
      max-width: 1240px;
      margin: 0 auto;
      padding: 0 16px 80px;
      display: flex;
      flex-direction: column;
      gap: 18px;
    }

    /* Glassmorphism Card System */
    .glass-panel {
      background: var(--card);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
    }
    .glass-panel:hover {
      border-color: rgba(255, 255, 255, 0.14);
    }

    /* Header & Navigation */
    header {
      position: sticky;
      top: 0;
      z-index: 60;
      background: rgba(3, 7, 18, 0.82);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      width: 100%;
    }
    .nav-inner {
      max-width: 1240px;
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
      min-width: 0;
    }
    .brand-logo-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      flex-shrink: 0;
      border-radius: 9px;
      background: linear-gradient(135deg, rgba(0, 242, 254, 0.2), rgba(168, 85, 247, 0.2));
      border: 1px solid rgba(0, 242, 254, 0.3);
      box-shadow: 0 0 14px var(--cyan-glow);
    }
    .brand-svg {
      width: 20px;
      height: 20px;
    }
    .brand-text-col {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .brand-title {
      font-size: 14px;
      font-weight: 800;
      letter-spacing: -0.3px;
      background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      line-height: 1.1;
      white-space: nowrap;
    }
    .brand-subtitle {
      font-size: 9px;
      font-weight: 600;
      color: var(--cyan);
      letter-spacing: 0.6px;
      text-transform: uppercase;
      font-family: 'JetBrains Mono', monospace;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .brand-pill {
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      padding: 3px 8px;
      background: rgba(0, 242, 254, 0.1);
      border: 1px solid rgba(0, 242, 254, 0.25);
      border-radius: var(--radius-full);
      color: var(--cyan);
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }
    .status-dot {
      width: 6px;
      height: 6px;
      background: var(--emerald);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--emerald);
      animation: blink 2s infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.85); }
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .nav-btn {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      text-decoration: none;
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      border: 1px solid transparent;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }
    .nav-btn:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.06);
      border-color: var(--border);
    }
    .nav-btn.active {
      color: #fff;
      background: rgba(0, 242, 254, 0.12);
      border-color: rgba(0, 242, 254, 0.3);
      box-shadow: 0 0 12px rgba(0, 242, 254, 0.2);
    }

    /* Hero Banner */
    .hero-banner {
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      background: linear-gradient(135deg, rgba(13, 27, 62, 0.6) 0%, rgba(20, 15, 45, 0.5) 100%);
      border: 1px solid rgba(0, 242, 254, 0.15);
      position: relative;
      overflow: hidden;
    }
    .hero-banner::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--cyan), var(--purple), transparent);
    }
    .hero-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .hero-content h1 {
      font-size: clamp(17px, 3.5vw, 22px);
      font-weight: 800;
      letter-spacing: -0.4px;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .hero-badge-hires {
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      padding: 2px 7px;
      border-radius: var(--radius-full);
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(245, 158, 11, 0.1));
      border: 1px solid rgba(251, 191, 36, 0.4);
      color: var(--gold);
      font-weight: 700;
      box-shadow: 0 0 10px var(--gold-glow);
      white-space: nowrap;
    }
    .hero-content p {
      font-size: 12.5px;
      color: var(--text-muted);
      line-height: 1.45;
      margin-top: 4px;
    }
    .hero-chips-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding-bottom: 2px;
      width: 100%;
    }
    .hero-chips-wrap::-webkit-scrollbar { display: none; }
    .hero-chip {
      font-size: 11px;
      padding: 5px 11px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      border-radius: var(--radius-full);
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .hero-chip:hover, .hero-chip:active {
      background: rgba(0, 242, 254, 0.15);
      border-color: var(--cyan);
      color: #fff;
    }

    /* Main Console Dual-Column Layout */
    .console-grid {
      display: grid;
      grid-template-columns: 1.15fr 1fr;
      gap: 18px;
    }

    .card-head {
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      background: rgba(5, 10, 24, 0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      font-weight: 700;
      gap: 8px;
    }
    .card-head-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #fff;
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card-head-pill {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: var(--text-dim);
      font-weight: 600;
      flex-shrink: 0;
    }
    .card-body {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* Form Fields & Controls */
    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .field-label {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px;
    }
    .field-label span.hint {
      font-size: 10px;
      font-weight: 500;
      color: var(--text-dim);
      text-transform: none;
      letter-spacing: normal;
    }

    /* Preset Endpoints Horizontal Bar */
    .quick-preset-bar {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 4px;
      scrollbar-width: none;
    }
    .quick-preset-bar::-webkit-scrollbar { display: none; }
    .btn-preset {
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.15s;
      min-height: 32px;
    }
    .btn-preset:hover, .btn-preset:active {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .btn-preset.active {
      color: var(--cyan);
      background: rgba(0, 242, 254, 0.12);
      border-color: rgba(0, 242, 254, 0.35);
      box-shadow: 0 0 10px rgba(0, 242, 254, 0.15);
    }

    /* Request URL Input Bar */
    .input-bar {
      display: flex;
      gap: 8px;
      position: relative;
    }
    .method-badge {
      padding: 0 12px;
      height: 42px;
      background: rgba(0, 242, 254, 0.1);
      border: 1px solid rgba(0, 242, 254, 0.25);
      color: var(--cyan);
      border-radius: var(--radius-sm);
      font-size: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 10px rgba(0, 242, 254, 0.1);
      flex-shrink: 0;
    }
    .input-code {
      flex: 1;
      background: rgba(3, 7, 18, 0.85);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 0 12px;
      height: 42px;
      color: #fff;
      font-size: 13px;
      outline: none;
      font-family: 'JetBrains Mono', monospace;
      min-width: 0;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input-code:focus {
      border-color: var(--border-focus);
      box-shadow: 0 0 14px var(--cyan-glow);
    }

    /* Quality Format Selector Grid */
    .quality-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }
    .q-card {
      padding: 9px 6px;
      background: rgba(3, 7, 18, 0.6);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      cursor: pointer;
      text-align: center;
      transition: all 0.2s;
      position: relative;
      overflow: hidden;
      min-height: 44px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .q-card:hover {
      background: rgba(255, 255, 255, 0.04);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .q-card.active {
      background: linear-gradient(135deg, rgba(0, 242, 254, 0.15) 0%, rgba(168, 85, 247, 0.1) 100%);
      border-color: var(--cyan);
      box-shadow: 0 0 14px var(--cyan-glow);
      color: #fff;
    }
    .q-card-title {
      font-size: 11.5px;
      font-weight: 700;
      display: block;
    }
    .q-card-sub {
      font-size: 8.5px;
      font-family: 'JetBrains Mono', monospace;
      color: var(--text-dim);
      margin-top: 2px;
      display: block;
    }
    .q-card.active .q-card-sub {
      color: var(--cyan);
      font-weight: 600;
    }

    /* Smart Resolver Bar */
    .resolver-bar {
      display: flex;
      gap: 8px;
    }

    /* Execute Button */
    .btn-exec {
      height: 44px;
      background: linear-gradient(135deg, #00f2fe 0%, #4facfe 100%);
      color: #030712;
      border: none;
      border-radius: var(--radius-sm);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      box-shadow: 0 4px 20px var(--cyan-glow);
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .btn-exec:hover, .btn-exec:active {
      transform: translateY(-1px);
      box-shadow: 0 6px 24px rgba(0, 242, 254, 0.5);
    }
    .btn-exec:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    /* Custom Lossless Studio Audio Player */
    .player-studio {
      background: linear-gradient(180deg, rgba(8, 14, 32, 0.9) 0%, rgba(4, 7, 18, 0.95) 100%);
      border: 1px solid rgba(0, 242, 254, 0.2);
      border-radius: var(--radius);
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 0 24px rgba(0, 242, 254, 0.08);
      position: relative;
      overflow: hidden;
    }
    .player-studio::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, var(--cyan), transparent);
    }
    .player-header {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }
    .player-art-wrap {
      position: relative;
      width: 52px;
      height: 52px;
      flex-shrink: 0;
    }
    .player-art {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      object-fit: cover;
      border: 1px solid var(--border);
      background: #000;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }
    .player-meta {
      flex: 1;
      min-width: 0;
    }
    .player-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .player-artist {
      font-size: 11.5px;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 2px;
    }
    .player-badge-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 4px;
      flex-wrap: wrap;
    }
    .format-pill {
      font-size: 9.5px;
      font-family: 'JetBrains Mono', monospace;
      padding: 2px 6px;
      border-radius: 4px;
      background: rgba(0, 242, 254, 0.12);
      border: 1px solid rgba(0, 242, 254, 0.25);
      color: var(--cyan);
      font-weight: 600;
      white-space: nowrap;
    }

    /* Visualizer Canvas */
    .visualizer-container {
      width: 100%;
      height: 44px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 6px;
      border: 1px solid var(--border-subtle);
      overflow: hidden;
      position: relative;
    }
    #audioVisualizer {
      width: 100%;
      height: 100%;
      display: block;
    }

    /* HTML Audio Element */
    audio {
      width: 100%;
      height: 36px;
      outline: none;
      filter: invert(100%) hue-rotate(180deg) contrast(120%);
      border-radius: 6px;
    }

    /* Player Action Buttons */
    .player-action-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .btn-action {
      flex: 1;
      min-width: 130px;
      height: 36px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      text-decoration: none;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .btn-action:hover, .btn-action:active {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
    }
    .btn-action-primary {
      background: rgba(0, 242, 254, 0.12);
      border-color: rgba(0, 242, 254, 0.3);
      color: var(--cyan);
    }
    .btn-action-primary:hover, .btn-action-primary:active {
      background: rgba(0, 242, 254, 0.22);
      color: #fff;
      border-color: var(--cyan);
      box-shadow: 0 0 12px var(--cyan-glow);
    }

    /* Inspector Tabs & Views */
    .tab-header {
      display: flex;
      gap: 12px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding-bottom: 2px;
      max-width: 100%;
    }
    .tab-header::-webkit-scrollbar { display: none; }
    .tab-item {
      font-size: 12px;
      font-weight: 700;
      color: var(--text-muted);
      cursor: pointer;
      padding-bottom: 4px;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .tab-item:hover { color: #fff; }
    .tab-item.active {
      color: #fff;
      border-bottom-color: var(--cyan);
      text-shadow: 0 0 12px var(--cyan-glow);
    }

    .code-box {
      background: rgba(2, 6, 18, 0.85);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 12px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11.5px;
      color: #e2e8f0;
      max-height: 360px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      line-height: 1.5;
      white-space: pre-wrap;
      word-break: break-all;
    }

    /* Metadata Key-Value Grid View */
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      max-height: 360px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .meta-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .meta-key {
      font-size: 9.5px;
      font-family: 'JetBrains Mono', monospace;
      color: var(--text-dim);
      text-transform: uppercase;
    }
    .meta-val {
      font-size: 11.5px;
      font-weight: 600;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Catalog Feed Section */
    .feed-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid var(--border);
      background: rgba(5, 10, 24, 0.5);
      gap: 8px;
    }
    .feed-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
      padding: 14px;
    }
    .feed-card {
      background: rgba(10, 16, 35, 0.6);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 10px;
      display: flex;
      gap: 10px;
      align-items: center;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
      min-width: 0;
    }
    .feed-card:hover, .feed-card:active {
      background: rgba(18, 28, 56, 0.8);
      border-color: rgba(0, 242, 254, 0.3);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    }
    .feed-card-art-wrap {
      position: relative;
      width: 54px;
      height: 54px;
      flex-shrink: 0;
      border-radius: 6px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    .feed-card-art {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .feed-card-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .feed-card-title {
      font-size: 12.5px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .feed-card-artist {
      font-size: 11px;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .feed-badge-row {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 2px;
    }
    .feed-card-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 5px;
    }
    .btn-feed-play {
      padding: 4px 9px;
      background: rgba(0, 242, 254, 0.12);
      border: 1px solid rgba(0, 242, 254, 0.3);
      border-radius: 4px;
      color: var(--cyan);
      font-size: 10.5px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.15s;
      min-height: 28px;
    }
    .btn-feed-play:hover, .btn-feed-play:active {
      background: var(--cyan);
      color: #030712;
      box-shadow: 0 0 10px var(--cyan-glow);
    }
    .btn-feed-icon {
      width: 28px;
      height: 28px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      border-radius: 4px;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: all 0.15s;
      flex-shrink: 0;
    }
    .btn-feed-icon:hover, .btn-feed-icon:active {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
      border-color: rgba(255, 255, 255, 0.3);
    }

    /* Modal Dialog */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(3, 7, 18, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 100;
      padding: 12px;
      animation: fadeIn 0.2s ease-out;
    }
    .modal-overlay.open { display: flex; }
    .modal-card {
      background: rgba(12, 18, 38, 0.96);
      border: 1px solid rgba(0, 242, 254, 0.3);
      border-radius: var(--radius);
      max-width: 720px;
      width: 100%;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 242, 254, 0.15);
    }
    .modal-header {
      padding: 14px 16px;
      border-bottom: 1px solid var(--border);
      background: rgba(5, 10, 24, 0.6);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }
    .modal-header-title {
      font-size: 13.5px;
      font-weight: 700;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .modal-body {
      padding: 16px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* Toast Notification */
    .toast {
      position: fixed;
      bottom: 20px;
      right: 16px;
      left: 16px;
      max-width: 380px;
      margin-left: auto;
      background: rgba(13, 21, 44, 0.96);
      border: 1px solid rgba(0, 242, 254, 0.4);
      color: #fff;
      padding: 11px 16px;
      border-radius: var(--radius-sm);
      font-size: 12.5px;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 242, 254, 0.2);
      transform: translateY(60px);
      opacity: 0;
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      z-index: 200;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toast.active { transform: translateY(0); opacity: 1; }

    /* SVG Icon Helpers */
    .icon {
      display: inline-flex;
      width: 14px;
      height: 14px;
      stroke-width: 2;
      stroke: currentColor;
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      flex-shrink: 0;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.97); }
      to { opacity: 1; transform: scale(1); }
    }

    /* ==========================================================================
       RESPONSIVE & MOBILE SPECIFIC OPTIMIZATIONS
       ========================================================================== */
    @media (max-width: 960px) {
      .console-grid { grid-template-columns: 1fr; }
      .quality-grid { grid-template-columns: repeat(2, 1fr); }
      .meta-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 640px) {
      .container { padding: 0 10px 60px; gap: 14px; }
      .nav-inner { padding: 8px 12px; }
      .brand-subtitle { display: none; }
      .brand-pill { display: none; }
      .hero-banner { padding: 14px; }
      .hero-content h1 { font-size: 16px; }
      .card-body { padding: 12px; gap: 12px; }
      .feed-grid { grid-template-columns: 1fr; padding: 10px; gap: 10px; }
      .modal-card { max-height: 92vh; margin: 0; }
      .modal-body { padding: 12px; }
      .player-action-row .btn-action { min-width: 100%; }
      .resolver-bar { flex-direction: column; }
      .resolver-bar .btn-action { width: 100%; height: 38px; }
    }

    @media (max-width: 380px) {
      .quality-grid { grid-template-columns: 1fr 1fr; }
      .brand-title { font-size: 13px; }
      .nav-btn span { display: none; }
      .nav-btn { padding: 6px 8px; }
    }
  </style>
</head>
<body>
  <!-- High Performance Adaptive Starfall Background Canvas -->
  <canvas id="starCanvas"></canvas>
  <div class="nebula nebula-1"></div>
  <div class="nebula nebula-2"></div>

  <!-- Header Navigation -->
  <header>
    <div class="nav-inner">
      <a href="/" class="brand">
        <div class="brand-logo-wrap">
          <svg class="brand-svg" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90" cy="90" fill="#000000" r="90" stroke="#00f2fe" stroke-width="8"/>
            <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="#ffffff"/>
            <rect fill="#00f2fe" height="72" width="12" x="115" y="54"/>
          </svg>
        </div>
        <div class="brand-text-col">
          <span class="brand-title">QOBUZ ENGINE</span>
          <span class="brand-subtitle">Studio Lossless 24B/192k</span>
        </div>
      </a>
      <div class="nav-actions">
        <div class="brand-pill">
          <span class="status-dot"></span>
          <span>EDGE CDN</span>
        </div>
        <a href="/" class="nav-btn active">
          <svg class="icon" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          <span>Console</span>
        </a>
        <a href="/docs" class="nav-btn">
          <svg class="icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
          <span>Docs</span>
        </a>
      </div>
    </div>
  </header>

  <div class="container">
    <!-- Hero Banner with Touch-Scrollable Preset Chips -->
    <div class="glass-panel hero-banner">
      <div class="hero-content">
        <div class="hero-header-row">
          <h1>
            <span>Audiophile Developer Console</span>
            <span class="hero-badge-hires">24-BIT MASTER</span>
          </h1>
        </div>
        <p>
          High-performance serverless music streaming engine featuring dynamic token extraction, request HMAC signing, Akamai direct CDN routing, and pure FLAC streams.
        </p>
      </div>
      <div class="hero-chips-wrap">
        <span style="font-size:10px;color:var(--text-dim);font-weight:700;white-space:nowrap;">PRESETS:</span>
        <button class="hero-chip" onclick="applyPreset('/api/search?q=Daft+Punk+Giorgio&type=track&limit=6')">🚀 Daft Punk</button>
        <button class="hero-chip" onclick="applyPreset('/api/search?q=Pink+Floyd+Dark+Side&type=album&limit=4')">🪐 Pink Floyd</button>
        <button class="hero-chip" onclick="applyPreset('/api/search?q=Hans+Zimmer+Interstellar&type=track&limit=6')">🌌 Hans Zimmer</button>
        <button class="hero-chip" onclick="applyPreset('/api/search?q=Miles+Davis+Kind+of+Blue&type=album&limit=4')">🎷 Miles Davis 192k</button>
        <button class="hero-chip" onclick="applyPreset('/api')">🩺 Health & Info</button>
      </div>
    </div>

    <!-- Dual Column Console (Single Column on Mobile) -->
    <div class="console-grid">
      <!-- Left Column: Request Builder & Smart Resolver -->
      <div class="glass-panel" style="display:flex;flex-direction:column;">
        <div class="card-head">
          <div class="card-head-title">
            <svg class="icon" style="color:var(--cyan);" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            <span>Request Builder</span>
          </div>
          <span class="card-head-pill">REST / JSON</span>
        </div>
        <div class="card-body">
          <!-- Quick Endpoint Switcher Horizontal Bar -->
          <div class="field">
            <label class="field-label">
              <span>Endpoint Category</span>
              <span class="hint">Swipe to switch</span>
            </label>
            <div class="quick-preset-bar">
              <button class="btn-preset active" onclick="setEndpointType('search-track')">Search Tracks</button>
              <button class="btn-preset" onclick="setEndpointType('search-album')">Search Albums</button>
              <button class="btn-preset" onclick="setEndpointType('search-artist')">Search Artists</button>
              <button class="btn-preset" onclick="setEndpointType('track-stream')">Track Stream URL</button>
              <button class="btn-preset" onclick="setEndpointType('album-manifest')">Album Package</button>
              <button class="btn-preset" onclick="setEndpointType('m3u-gen')">M3U Generator</button>
            </div>
          </div>

          <!-- Target Endpoint Input -->
          <div class="field">
            <label class="field-label">
              <span>Target Endpoint</span>
              <span class="hint">HTTP GET</span>
            </label>
            <div class="input-bar">
              <div class="method-badge">GET</div>
              <input type="text" id="reqInput" class="input-code" value="/api/search?q=Daft+Punk+Giorgio&type=track&limit=6" placeholder="/api/search?q=..." />
            </div>
          </div>

          <!-- Smart URL / Link Resolver -->
          <div class="field">
            <label class="field-label">
              <span>Smart Link / ID Resolver</span>
              <span class="hint">Paste URL or ID</span>
            </label>
            <div class="resolver-bar">
              <input type="text" id="resolveInput" class="input-code" placeholder="https://play.qobuz.com/album/... or ID" />
              <button class="btn-action btn-action-primary" style="flex:initial;padding:0 16px;height:42px;" onclick="handleResolve()">
                <svg class="icon" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                <span>Resolve</span>
              </button>
            </div>
          </div>

          <!-- Audio Format Quality Grid (2x2 on Mobile) -->
          <div class="field">
            <label class="field-label">
              <span>Audio Format Quality</span>
              <span class="hint">Direct Akamai CDN</span>
            </label>
            <div class="quality-grid">
              <div class="q-card active" data-q="6">
                <span class="q-card-title">FLAC 16B</span>
                <span class="q-card-sub">44.1k CD</span>
              </div>
              <div class="q-card" data-q="7">
                <span class="q-card-title">FLAC 24B</span>
                <span class="q-card-sub">≤ 96k Hi-Res</span>
              </div>
              <div class="q-card" data-q="27">
                <span class="q-card-title">FLAC 24B+</span>
                <span class="q-card-sub">192k Master</span>
              </div>
              <div class="q-card" data-q="5">
                <span class="q-card-title">MP3 320</span>
                <span class="q-card-sub">320 kbps</span>
              </div>
            </div>
          </div>

          <!-- Execute Button -->
          <button id="btnExecute" class="btn-exec">
            <svg class="icon" style="stroke-width:2.5;" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span>Execute Request</span>
          </button>
        </div>
      </div>

      <!-- Right Column: Studio Lossless Player & Multi-Inspector -->
      <div class="glass-panel" style="display:flex;flex-direction:column;">
        <div class="card-head">
          <div class="tab-header">
            <span class="tab-item active" id="tabHeadPlayer" onclick="switchTab('player')">
              <svg class="icon" viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              <span>Player</span>
            </span>
            <span class="tab-item" id="tabHeadJson" onclick="switchTab('json')">
              <svg class="icon" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              <span>JSON</span>
            </span>
            <span class="tab-item" id="tabHeadSdk" onclick="switchTab('sdk')">
              <svg class="icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M10 10l-2 2 2 2m4-4l2 2-2 2"></path></svg>
              <span>SDK</span>
            </span>
            <span class="tab-item" id="tabHeadMeta" onclick="switchTab('meta')">
              <svg class="icon" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              <span>Tags</span>
            </span>
          </div>
          <span id="badgeLatency" class="card-head-pill" style="color:var(--emerald);">READY</span>
        </div>

        <div class="card-body" style="flex:1;">
          <!-- View 1: Studio Lossless Player -->
          <div id="viewPlayer" class="player-studio">
            <div class="player-header">
              <div class="player-art-wrap">
                <img id="artThumb" class="player-art" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%230f172a'%3E%3Crect width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%23475569'%3EAUDIO%3C/text%3E%3C/svg%3E" alt="Cover" />
              </div>
              <div class="player-meta">
                <div id="songTitle" class="player-title">No Track Selected</div>
                <div id="artistName" class="player-artist">Tap ▶ Play on any track below</div>
                <div class="player-badge-row">
                  <span id="formatStatus" class="format-pill">Akamai Direct Stream</span>
                  <span id="durationStatus" class="format-pill" style="color:var(--text-muted);border-color:var(--border);">--:--</span>
                </div>
              </div>
            </div>

            <!-- Audio Waveform / Spectrum Visualizer -->
            <div class="visualizer-container">
              <canvas id="audioVisualizer"></canvas>
            </div>

            <!-- HTML5 Audio Stream Element -->
            <audio id="audioStream" controls preload="none"></audio>

            <!-- Player Action Bar -->
            <div class="player-action-row">
              <a id="btnDl" href="#" target="_blank" class="btn-action btn-action-primary">
                <svg class="icon" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>Download Audio</span>
              </a>
              <button id="btnCopyCdn" class="btn-action">
                <svg class="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy Direct CDN URL</span>
              </button>
            </div>
          </div>

          <!-- View 2: Formatted JSON Response Explorer -->
          <div id="viewJson" style="display:none;flex-direction:column;gap:8px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:11px;color:var(--text-muted);font-weight:600;">RESPONSE PAYLOAD</span>
              <button class="btn-action" style="flex:initial;padding:2px 10px;height:26px;font-size:11px;" onclick="copyJsonResponse()">
                <svg class="icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                <span>Copy JSON</span>
              </button>
            </div>
            <div id="codeDisplay" class="code-box">{ "status": "Ready to execute..." }</div>
          </div>

          <!-- View 3: Multi-Language Code SDK Generator -->
          <div id="viewSdk" style="display:none;flex-direction:column;gap:10px;">
            <div style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;">
              <button class="btn-preset active" id="sdkBtnCurl" onclick="renderSnippet('curl')">cURL</button>
              <button class="btn-preset" id="sdkBtnJs" onclick="renderSnippet('js')">JS Fetch</button>
              <button class="btn-preset" id="sdkBtnNode" onclick="renderSnippet('node')">Node.js</button>
              <button class="btn-preset" id="sdkBtnKotlin" onclick="renderSnippet('kotlin')">Kotlin</button>
              <button class="btn-preset" id="sdkBtnPython" onclick="renderSnippet('python')">Python</button>
            </div>
            <div id="sdkCodeBox" class="code-box">curl -X GET "..."</div>
          </div>

          <!-- View 4: Audio Metadata & Vorbis Tags Inspector -->
          <div id="viewMeta" style="display:none;flex-direction:column;gap:10px;">
            <div id="metaGridContainer" class="meta-grid">
              <div class="meta-card">
                <span class="meta-key">Title</span>
                <span class="meta-val" id="metaTitle">--</span>
              </div>
              <div class="meta-card">
                <span class="meta-key">Artist / Performer</span>
                <span class="meta-val" id="metaArtist">--</span>
              </div>
              <div class="meta-card">
                <span class="meta-key">Album</span>
                <span class="meta-val" id="metaAlbum">--</span>
              </div>
              <div class="meta-card">
                <span class="meta-key">Format & Quality</span>
                <span class="meta-val" id="metaQuality">--</span>
              </div>
              <div class="meta-card">
                <span class="meta-key">ISRC Code</span>
                <span class="meta-val" id="metaIsrc">--</span>
              </div>
              <div class="meta-card">
                <span class="meta-key">Release Date</span>
                <span class="meta-val" id="metaDate">--</span>
              </div>
              <div class="meta-card">
                <span class="meta-key">Label / Copyright</span>
                <span class="meta-val" id="metaLabel">--</span>
              </div>
              <div class="meta-card">
                <span class="meta-key">Track / Media</span>
                <span class="meta-val" id="metaTrackNo">--</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Catalog Results & Discovery Feed -->
    <div class="glass-panel" style="overflow:hidden;">
      <div class="feed-header-row">
        <div class="card-head-title">
          <svg class="icon" style="color:var(--purple);" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
          <span>Catalog Results & Discovery Feed</span>
        </div>
        <span id="feedCounter" class="card-head-pill">0 items</span>
      </div>
      <div id="catalogFeed" class="feed-grid">
        <div style="grid-column: 1/-1; text-align:center; padding: 36px 16px; color: var(--text-dim); font-size: 13px;">
          Executing initial query...
        </div>
      </div>
    </div>
  </div>

  <!-- Interactive Album & Playlist Modal Drawer -->
  <div class="modal-overlay" id="modalOverlay" onclick="handleModalClick(event)">
    <div class="modal-card">
      <div class="modal-header">
        <div class="modal-header-title" id="modalAlbumTitle">Album Tracks</div>
        <button class="btn-feed-icon" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-body" id="modalBody">
        <div style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">Loading package manifest...</div>
      </div>
    </div>
  </div>

  <!-- Toast Notification Bar -->
  <div class="toast" id="toast">
    <svg class="icon" style="color:var(--cyan);" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span id="toastMsg">Notification</span>
  </div>

  <script>
    /* ==========================================================================
       1. ADAPTIVE MOBILE-OPTIMIZED STARFALL ENGINE
       ========================================================================== */
    const canvas = document.getElementById('starCanvas');
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let isMobile = window.innerWidth < 768;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      isMobile = window.innerWidth < 768;
      initStars();
      updateVisDimensions();
    }
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', () => setTimeout(resizeCanvas, 200));

    const stars = [];
    const meteors = [];

    class Star {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.3;
        this.baseAlpha = Math.random() * 0.7 + 0.2;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.color = Math.random() > 0.8 ? '#00f2fe' : (Math.random() > 0.6 ? '#a855f7' : '#ffffff');
      }
      update() {
        this.alpha += this.twinkleSpeed;
        if (this.alpha > 1 || this.alpha < 0.2) this.twinkleSpeed = -this.twinkleSpeed;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Meteor {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width * 1.4 - width * 0.2;
        this.y = -40;
        this.length = Math.random() * (isMobile ? 50 : 80) + 40;
        this.speed = Math.random() * 6 + 5;
        this.angle = Math.PI / 4 + (Math.random() * 0.15 - 0.07);
        this.active = false;
        this.waitTime = Math.random() * 200 + 40;
        this.size = Math.random() * 1.5 + 1;
      }
      update() {
        if (!this.active) {
          this.waitTime--;
          if (this.waitTime <= 0) this.active = true;
          return;
        }
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.y > height + 80 || this.x > width + 80) this.reset();
      }
      draw() {
        if (!this.active) return;
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
        grad.addColorStop(0, 'rgba(0, 242, 254, 0)');
        grad.addColorStop(0.7, 'rgba(0, 242, 254, 0.4)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = this.size;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initStars() {
      stars.length = 0;
      meteors.length = 0;
      const count = isMobile ? 65 : 140;
      const meteorCount = isMobile ? 2 : 3;
      for (let i = 0; i < count; i++) stars.push(new Star());
      for (let i = 0; i < meteorCount; i++) meteors.push(new Meteor());
    }
    initStars();

    function renderStarfall() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => { s.update(); s.draw(); });
      meteors.forEach(m => { m.update(); m.draw(); });
      requestAnimationFrame(renderStarfall);
    }
    renderStarfall();

    /* ==========================================================================
       2. RESPONSIVE AUDIO SPECTRUM VISUALIZER
       ========================================================================== */
    const visCanvas = document.getElementById('audioVisualizer');
    const visCtx = visCanvas.getContext('2d');
    let visWidth = 300;
    let visHeight = 44;

    function updateVisDimensions() {
      visWidth = visCanvas.width = visCanvas.offsetWidth || 300;
      visHeight = visCanvas.height = visCanvas.offsetHeight || 44;
    }
    setTimeout(updateVisDimensions, 100);

    const BAR_COUNT = 32;
    const barHeights = new Array(BAR_COUNT).fill(2);
    let isAudioPlaying = false;

    function renderVisualizer() {
      visCtx.clearRect(0, 0, visWidth, visHeight);
      const totalSpacing = BAR_COUNT * 2;
      const barWidth = Math.max(2, (visWidth - totalSpacing) / BAR_COUNT);

      for (let i = 0; i < BAR_COUNT; i++) {
        if (isAudioPlaying) {
          const target = Math.sin(Date.now() * 0.006 + i * 0.35) * 14 + Math.random() * 16 + 6;
          barHeights[i] += (target - barHeights[i]) * 0.3;
        } else {
          barHeights[i] += (2 - barHeights[i]) * 0.1;
        }

        const h = Math.max(2, Math.min(visHeight - 4, barHeights[i]));
        const x = i * (barWidth + 2);
        const y = visHeight - h;

        const grad = visCtx.createLinearGradient(0, visHeight, 0, 0);
        grad.addColorStop(0, 'rgba(0, 242, 254, 0.3)');
        grad.addColorStop(0.6, 'rgba(0, 242, 254, 0.8)');
        grad.addColorStop(1, 'rgba(168, 85, 247, 0.9)');

        visCtx.fillStyle = grad;
        visCtx.fillRect(x, y, barWidth, h);
      }
      requestAnimationFrame(renderVisualizer);
    }
    renderVisualizer();

    /* ==========================================================================
       3. CONSOLE & PLAYGROUND STATE
       ========================================================================== */
    let activeQuality = 6;
    let activeSignedUrl = '';
    let currentData = null;
    let currentSdkLang = 'curl';

    const reqInput = document.getElementById('reqInput');
    const resolveInput = document.getElementById('resolveInput');
    const btnExecute = document.getElementById('btnExecute');
    const badgeLatency = document.getElementById('badgeLatency');
    const codeDisplay = document.getElementById('codeDisplay');
    const sdkCodeBox = document.getElementById('sdkCodeBox');
    const catalogFeed = document.getElementById('catalogFeed');
    const feedCounter = document.getElementById('feedCounter');
    const audioStream = document.getElementById('audioStream');
    const artThumb = document.getElementById('artThumb');
    const songTitle = document.getElementById('songTitle');
    const artistName = document.getElementById('artistName');
    const formatStatus = document.getElementById('formatStatus');
    const durationStatus = document.getElementById('durationStatus');
    const btnDl = document.getElementById('btnDl');
    const btnCopyCdn = document.getElementById('btnCopyCdn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    document.querySelectorAll('.q-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.q-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        activeQuality = parseInt(card.dataset.q, 10);
        renderSnippet(currentSdkLang);
        showToast(\`Format quality set to ID \${activeQuality}\`);
      });
    });

    audioStream.addEventListener('play', () => { isAudioPlaying = true; });
    audioStream.addEventListener('pause', () => { isAudioPlaying = false; });
    audioStream.addEventListener('ended', () => { isAudioPlaying = false; });

    btnExecute.addEventListener('click', runQuery);
    reqInput.addEventListener('keydown', e => { if (e.key === 'Enter') runQuery(); });
    resolveInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleResolve(); });

    btnCopyCdn.addEventListener('click', () => {
      if (!activeSignedUrl) {
        showToast('No stream URL active. Play a track first.');
        return;
      }
      navigator.clipboard.writeText(activeSignedUrl);
      showToast('Akamai CDN Stream URL copied to clipboard');
    });

    async function runQuery() {
      let path = reqInput.value.trim();
      if (!path.startsWith('/')) path = '/' + path;

      btnExecute.disabled = true;
      badgeLatency.textContent = '...';
      badgeLatency.style.color = 'var(--gold)';

      const startTime = performance.now();
      try {
        const res = await fetch(path);
        const elapsed = Math.round(performance.now() - startTime);
        badgeLatency.textContent = \`\${res.status} OK • \${elapsed}ms\`;
        badgeLatency.style.color = res.ok ? 'var(--emerald)' : 'var(--rose)';

        const contentType = res.headers.get('Content-Type') || '';
        if (contentType.includes('json')) {
          const json = await res.json();
          currentData = json;
          codeDisplay.textContent = JSON.stringify(json, null, 2);
          renderResults(json);
          renderSnippet(currentSdkLang);
          updateMetadataFromData(json);
        } else {
          const text = await res.text();
          codeDisplay.textContent = text;
        }
      } catch (err) {
        codeDisplay.textContent = 'Network Error: ' + err.message;
        badgeLatency.textContent = 'FAILED';
        badgeLatency.style.color = 'var(--rose)';
      } finally {
        btnExecute.disabled = false;
      }
    }

    async function handleResolve() {
      const input = resolveInput.value.trim();
      if (!input) return;
      reqInput.value = \`/api/resolve?url=\${encodeURIComponent(input)}\`;
      await runQuery();
    }

    function setEndpointType(type) {
      document.querySelectorAll('.quick-preset-bar .btn-preset').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');

      switch (type) {
        case 'search-track':
          reqInput.value = '/api/search?q=Daft+Punk+Giorgio&type=track&limit=6';
          break;
        case 'search-album':
          reqInput.value = '/api/search?q=Pink+Floyd+Dark+Side&type=album&limit=4';
          break;
        case 'search-artist':
          reqInput.value = '/api/search?q=Hans+Zimmer&type=artist&limit=4';
          break;
        case 'track-stream':
          reqInput.value = \`/api/track/5948332/url?quality=\${activeQuality}\`;
          break;
        case 'album-manifest':
          reqInput.value = \`/api/download/album/0886444074218?quality=\${activeQuality}\`;
          break;
        case 'm3u-gen':
          reqInput.value = \`/api/download/m3u?type=album&id=0886444074218&quality=\${activeQuality}\`;
          break;
      }
      runQuery();
    }

    function applyPreset(path) {
      reqInput.value = path;
      runQuery();
    }

    function renderResults(data) {
      catalogFeed.innerHTML = '';
      const items = data.results?.tracks?.items || 
                    data.results?.albums?.items || 
                    data.results?.artists?.items || 
                    data.results?.playlists?.items || 
                    data.results?.items || 
                    (Array.isArray(data.items) ? data.items : (data.item ? [data.item] : []));

      feedCounter.textContent = \`\${items.length} items\`;

      if (!items.length) {
        catalogFeed.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 36px 16px; color: var(--text-dim); font-size: 13px;">No items returned from query</div>';
        return;
      }

      items.forEach(item => {
        const title = item.title || item.name || 'Untitled';
        const artist = item.performer?.name || item.artist?.name || item.owner?.name || 'Various Artists';
        const art = item.album?.image?.small || item.image?.small || item.picture?.small || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="%231e293b"%3E%3Crect width="80" height="80"/%3E%3C/svg%3E';
        const isHiRes = item.hires_streamable || (item.maximum_bit_depth && item.maximum_bit_depth > 16) || item.hires;
        const bitDepth = item.maximum_bit_depth || (item.hires ? 24 : 16);
        const sampleRate = item.maximum_sampling_rate || (item.hires ? 96 : 44.1);
        const isAlbum = Boolean(item.tracks_count || item.media_count);
        const isArtist = item.albums_count !== undefined;
        const isPlaylist = item.tracks_count !== undefined && !item.label;
        const durationSec = item.duration ? formatDuration(item.duration) : null;

        const card = document.createElement('div');
        card.className = 'feed-card';
        card.innerHTML = \`
          <div class="feed-card-art-wrap">
            <img src="\${art}" class="feed-card-art" alt="Art" loading="lazy" />
          </div>
          <div class="feed-card-info">
            <div class="feed-card-title" title="\${title}">\${title}</div>
            <div class="feed-card-artist" title="\${artist}">\${artist}</div>
            <div class="feed-badge-row">
              <span class="format-pill" style="\${isHiRes ? 'color:var(--gold);border-color:rgba(251,191,36,0.3);background:rgba(251,191,36,0.1);' : ''}">\${bitDepth}B/\${sampleRate}k</span>
              \${durationSec ? \`<span style="font-size:10px;font-family:'JetBrains Mono',monospace;color:var(--text-dim);">\${durationSec}</span>\` : ''}
            </div>
            <div class="feed-card-actions">
              \${!isAlbum && !isArtist && !isPlaylist ? \`
                <button class="btn-feed-play btn-play-track">▶ Play</button>
                <a href="/api/download/track/\${item.id}?quality=\${activeQuality}" class="btn-feed-icon" target="_blank" title="Download">⬇</a>
                <button class="btn-feed-icon btn-meta-inspect" title="Tags">📋</button>
              \` : \`
                <button class="btn-feed-play btn-view-album">📂 View</button>
                <a href="/api/download/m3u?type=\${isAlbum ? 'album' : 'playlist'}&id=\${item.id}&quality=\${activeQuality}" class="btn-feed-icon" target="_blank" title="M3U">📄</a>
              \`}
            </div>
          </div>
        \`;

        if (!isAlbum && !isArtist && !isPlaylist) {
          card.querySelector('.btn-play-track').addEventListener('click', () => {
            streamTrack(item.id, title, artist, art, item.duration, item);
          });
          card.querySelector('.btn-meta-inspect').addEventListener('click', () => {
            updateMetadataCard(item);
            switchTab('meta');
          });
        } else {
          card.querySelector('.btn-view-album').addEventListener('click', () => {
            openAlbum(item.id, isPlaylist ? 'playlist' : 'album');
          });
        }

        catalogFeed.appendChild(card);
      });
    }

    async function streamTrack(trackId, title, artist, art, duration, rawMeta = {}) {
      switchTab('player');
      songTitle.textContent = title;
      artistName.textContent = artist;
      artThumb.src = art;
      formatStatus.textContent = 'Resolving signed stream...';
      durationStatus.textContent = duration ? formatDuration(duration) : '--:--';
      updateMetadataCard(rawMeta, title, artist);

      try {
        const res = await fetch(\`/api/track/\${trackId}/url?quality=\${activeQuality}\`);
        const json = await res.json();
        if (json.success && json.data?.url) {
          activeSignedUrl = json.data.url;
          audioStream.src = activeSignedUrl;
          audioStream.play();
          const bitDepth = json.data.bit_depth || 16;
          const sampleRate = json.data.sampling_rate || 44.1;
          const mime = json.data.mime_type?.includes('flac') ? 'FLAC' : 'MP3';
          formatStatus.textContent = \`\${mime} \${bitDepth}B / \${sampleRate}k • Akamai\`;
          btnDl.href = \`/api/download/track/\${trackId}?quality=\${activeQuality}\`;
          showToast(\`Playing "\${title}"\`);
        } else {
          formatStatus.textContent = 'Stream error: ' + (json.error || 'Unknown');
        }
      } catch (err) {
        formatStatus.textContent = 'Error: ' + err.message;
      }
    }

    async function openAlbum(id, type = 'album') {
      const modal = document.getElementById('modalOverlay');
      const body = document.getElementById('modalBody');
      modal.classList.add('open');
      body.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text-muted);font-size:13px;">Loading package manifest...</div>';

      try {
        const endpoint = type === 'album' ? \`/api/download/album/\${id}?quality=\${activeQuality}\` : \`/api/download/playlist/\${id}?quality=\${activeQuality}\`;
        const res = await fetch(endpoint);
        const data = await res.json();
        const pkg = data.album || data.playlist;

        document.getElementById('modalAlbumTitle').textContent = \`\${pkg.albumTitle || pkg.title} (\${pkg.totalTracks} Tracks)\`;
        body.innerHTML = \`
          <div style="display:flex;gap:14px;align-items:center;padding-bottom:12px;border-bottom:1px solid var(--border);">
            <img src="\${pkg.coverUrl}" style="width:64px;height:64px;border-radius:8px;object-fit:cover;border:1px solid var(--border);" />
            <div style="flex:1;min-width:0;">
              <div style="font-weight:700;font-size:14px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">\${pkg.albumTitle || pkg.title}</div>
              <div style="font-size:11.5px;color:var(--text-muted);margin-top:2px;">\${pkg.artist || pkg.owner} • \${pkg.releaseDate || ''}</div>
              <div style="display:flex;gap:8px;margin-top:6px;flex-wrap:wrap;">
                <a href="/api/download/m3u?type=\${type}&id=\${id}&quality=\${activeQuality}" target="_blank" class="btn-action btn-action-primary" style="height:26px;font-size:10.5px;padding:0 8px;min-width:auto;">
                  📄 M3U Playlist
                </a>
                <a href="\${pkg.coverUrl}" target="_blank" class="btn-action" style="height:26px;font-size:10.5px;padding:0 8px;min-width:auto;">
                  🖼️ Cover
                </a>
              </div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;max-height:340px;overflow-y:auto;-webkit-overflow-scrolling:touch;">
            \${pkg.tracks.map(t => \`
              <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 10px;background:rgba(255,255,255,0.03);border:1px solid var(--border-subtle);border-radius:6px;font-size:11.5px;">
                <div style="display:flex;align-items:center;gap:8px;overflow:hidden;min-width:0;">
                  <span style="font-family:'JetBrains Mono',monospace;color:var(--cyan);font-weight:700;width:18px;flex-shrink:0;">\${t.trackNumber}</span>
                  <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#fff;">\${t.title}</span>
                </div>
                <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
                  <span style="font-family:'JetBrains Mono',monospace;color:var(--text-dim);font-size:10px;">\${formatDuration(t.duration)}</span>
                  <button onclick="streamTrack('\${t.trackId}', '\${t.title.replace(/'/g, "")}', '\${(pkg.artist || pkg.owner).replace(/'/g, "")}', '\${pkg.coverUrl}', \${t.duration})" class="btn-feed-play" style="padding:2px 7px;font-size:9.5px;min-height:24px;">▶</button>
                  <a href="/api/download/track/\${t.trackId}?quality=\${activeQuality}" target="_blank" class="btn-feed-icon" style="width:24px;height:24px;" title="Download">⬇</a>
                </div>
              </div>
            \`).join('')}
          </div>
        \`;
      } catch (err) {
        body.innerHTML = '<div style="color:var(--rose);font-size:12px;padding:20px;text-align:center;">Failed to load package: ' + err.message + '</div>';
      }
    }

    function closeModal() {
      document.getElementById('modalOverlay').classList.remove('open');
    }
    function handleModalClick(e) {
      if (e.target.id === 'modalOverlay') closeModal();
    }

    function updateMetadataCard(item, overrideTitle, overrideArtist) {
      document.getElementById('metaTitle').textContent = overrideTitle || item.title || item.name || '--';
      document.getElementById('metaArtist').textContent = overrideArtist || item.performer?.name || item.artist?.name || '--';
      document.getElementById('metaAlbum').textContent = item.album?.title || '--';
      document.getElementById('metaQuality').textContent = \`\${item.maximum_bit_depth || 16}B / \${item.maximum_sampling_rate || 44.1}kHz FLAC\`;
      document.getElementById('metaIsrc').textContent = item.isrc || item.upc || '--';
      document.getElementById('metaDate').textContent = item.released_at ? new Date(item.released_at * 1000).toLocaleDateString() : (item.release_date_original || '--');
      document.getElementById('metaLabel').textContent = item.label?.name || item.copyright || '--';
      document.getElementById('metaTrackNo').textContent = \`Track \${item.track_number || 1} • Disc \${item.media_number || 1}\`;
    }

    function updateMetadataFromData(json) {
      if (json.item) updateMetadataCard(json.item);
    }

    function renderSnippet(lang) {
      currentSdkLang = lang;
      document.querySelectorAll('#viewSdk .btn-preset').forEach(b => b.classList.remove('active'));
      const activeBtn = document.getElementById(\`sdkBtn\${lang.charAt(0).toUpperCase() + lang.slice(1)}\`);
      if (activeBtn) activeBtn.classList.add('active');

      const path = reqInput.value.trim();
      const fullUrl = \`\${window.location.origin}\${path.startsWith('/') ? path : '/' + path}\`;

      if (lang === 'curl') {
        sdkCodeBox.textContent = \`curl -X GET "\${fullUrl}" \\\\\n  -H "Accept: application/json"\`;
      } else if (lang === 'js') {
        sdkCodeBox.textContent = \`const res = await fetch("\${fullUrl}");\nconst data = await res.json();\nconsole.log(data);\`;
      } else if (lang === 'node') {
        sdkCodeBox.textContent = \`import axios from 'axios';\nconst { data } = await axios.get("\${fullUrl}");\nconsole.log(data);\`;
      } else if (lang === 'kotlin') {
        sdkCodeBox.textContent = \`val req = Request.Builder().url("\${fullUrl}").build()\nclient.newCall(req).execute().use { res ->\n    println(res.body?.string())\n}\`;
      } else if (lang === 'python') {
        sdkCodeBox.textContent = \`import requests\nres = requests.get("\${fullUrl}")\nprint(res.json())\`;
      }
    }

    function switchTab(tab) {
      document.querySelectorAll('.tab-header .tab-item').forEach(t => t.classList.remove('active'));
      document.getElementById('viewPlayer').style.display = tab === 'player' ? 'flex' : 'none';
      document.getElementById('viewJson').style.display = tab === 'json' ? 'flex' : 'none';
      document.getElementById('viewSdk').style.display = tab === 'sdk' ? 'flex' : 'none';
      document.getElementById('viewMeta').style.display = tab === 'meta' ? 'flex' : 'none';

      if (tab === 'player') document.getElementById('tabHeadPlayer').classList.add('active');
      if (tab === 'json') document.getElementById('tabHeadJson').classList.add('active');
      if (tab === 'sdk') {
        document.getElementById('tabHeadSdk').classList.add('active');
        renderSnippet(currentSdkLang);
      }
      if (tab === 'meta') document.getElementById('tabHeadMeta').classList.add('active');
    }

    function showToast(msg) {
      toastMsg.textContent = msg;
      toast.classList.add('active');
      setTimeout(() => toast.classList.remove('active'), 2800);
    }

    function copyJsonResponse() {
      if (!currentData) return;
      navigator.clipboard.writeText(JSON.stringify(currentData, null, 2));
      showToast('JSON response copied');
    }

    function formatDuration(sec) {
      if (!sec) return '0:00';
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60);
      return \`\${m}:\${s < 10 ? '0' : ''}\${s}\`;
    }

    // Initial Execution
    runQuery();
  </script>
</body>
</html>`;
}
