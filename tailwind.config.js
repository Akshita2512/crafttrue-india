/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          terracotta: '#C85A32',
          saffron: '#FF9933',
          marigold: '#F4A228',
          sandstone: '#F7F3E9',
          cream: '#FFFDF9',
          indigo: '#1F2D4A',
          emerald: '#1C4A3A',
          charcoal: '#232323',
          gold: '#D4AF37',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
