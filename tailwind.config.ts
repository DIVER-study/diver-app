import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'Arial', 'sans-serif'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
        'new-zen': ['new-zen', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        logoorange: 'var(--color-logoorage)',
        bgbeige: 'var(--color-beige)',
      },
    },
  },
  plugins: [],
} satisfies Config;
