import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        truescape: {
          blue: '#0085ca',
          hover: '#006ba8',
          subtle: 'rgba(0, 133, 202, 0.12)',
          glow: 'rgba(0, 133, 202, 0.35)',
          charcoal: '#3c3c3b',
          dark: '#020617',
          gray: '#f2f2f2'
        }
      },
      fontFamily: {
        sans: ['proxima-nova', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
