globals_css = """@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --c-bg: #ffffff;
  --c-bg-subtle: #f8fafc;
  --c-surface: #ffffff;
  --c-surface-hover: #f1f5f9;
  --c-border: #e2e8f0;
  --c-border-hover: #cbd5e1;
  --c-text: #0f172a;
  --c-text-2: #475569;
  --c-text-3: #94a3b8;
  --c-accent: #0085ca;
  --c-accent-hover: #006ba8;
  --c-glow: rgba(0, 133, 202, 0.12);
  --font: 'proxima-nova', 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
  --mono: 'JetBrains Mono', 'SF Mono', monospace;
  --ease: cubic-bezier(.4, 0, .2, 1);
  --ease-spring: cubic-bezier(.16, 1, .3, 1);
}

html {
  scroll-behavior: smooth;
  color-scheme: light;
  background-color: var(--c-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--c-bg);
  color: var(--c-text);
  font-family: var(--font);
  line-height: 1.65;
  overflow-x: hidden;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* Pulse Live Animation Dot */
.pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
  animation: pulseDot 2s infinite;
  display: inline-block;
  flex-shrink: 0;
}

@keyframes pulseDot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.85); }
}

/* Floating Gesture Prompt Animation */
@keyframes floatInteract {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.animate-float-interact {
  animation: floatInteract 3.2s ease-in-out infinite;
}

/* Truescape Signature Title Bar */
.truescape-title-bar {
  position: relative;
  padding-top: 16px;
}
.truescape-title-bar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: var(--c-accent);
  border-radius: 2px;
}

/* Clean Light Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f8fafc;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #0085ca;
}

/* Code block typography */
pre code {
  font-family: var(--mono);
  font-size: 0.82rem;
  line-height: 1.55;
}
"""

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(globals_css)
print('globals.css updated to light theme')
