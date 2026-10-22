/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#5F249F',
          'primary-soft': 'rgba(95,36,159,0.05)',
          accent: '#F4C542',
          'accent-hover': '#F8C32C',
          'accent-ring': '#EDCB50',
        },
        ink: { dark: '#111111', footer: 'rgba(255,255,255,0.72)' },
        line: { border: '#DADBDD' },
        info: { link: '#1A7EFB' },
        overlay: { event: '#064E3B' },
        danger: '#DC2626',
      },
      fontFamily: {
        heading: ['"Work Sans"', 'ui-sans-serif', 'sans-serif'],
        body: ['"Nunito Sans"', 'ui-sans-serif', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
        'pill-nav': '55px',
        card: '20px',
        logo: '10px',
        dot: '3px',
      },
      boxShadow: {
        cta: '0 6px 18px 0 rgba(0,0,0,0.18)',
        play: '1px 0 6px 0 rgba(0,0,0,0.30)',
        input: '0 0 10px 0 rgba(0,0,0,0.50)',
        'ring-accent': '0 0 0 1px #EDCB50',
        'ring-primary': '0 0 0 1px #5F249F',
      },
      backgroundImage: {
        'card-overlay': 'linear-gradient(270deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 100%)',
        'event-overlay': 'linear-gradient(270deg, rgba(6,78,59,0.75) 0%, rgba(6,78,59,0.01) 100%)',
        'mission-overlay': 'linear-gradient(180deg, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 80%)',
        'divider-v': 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.16) 100%)',
        'edge-fade-l': 'linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
        'edge-fade-r': 'linear-gradient(270deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
      },
    },
  },
  plugins: [],
}