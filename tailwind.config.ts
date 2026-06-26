import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-bricolage)', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'sans-serif'],
      },
      colors: {
        clf: {
          red:          '#B91C1C',
          black:        '#1C1917',
          'off-white':  '#FAFAF9',
          'warm-gray':  '#E7E5E4',
          amber:        '#FEF3C7',
          text:         '#44403C',
        },
      },
    },
  },
};

export default config;
