/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cabinet Grotesk', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      colors: {
        bg:         '#F7F5F0',
        ink:        '#1A1A2E',
        'ink-2':    '#4A4A6A',
        'ink-3':    '#9898B0',
        border:     '#E8E4DC',
        indigo:     '#5C35CC',
        'indigo-lt':'#EDE8FA',
        coral:      '#FF4C3B',
        'coral-lt': '#FFF0EE',
        amber:      '#F59E0B',
        'amber-lt': '#FFFBEB',
        slate:      '#94A3B8',
        'slate-lt': '#F1F5F9',
        expired:    '#D1C9BE',
        'expired-lt':'#F5F3F0',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card:   '0 20px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.07)',
        'card-sm': '0 8px 24px rgba(0,0,0,0.07)',
        indigo: '0 4px 16px rgba(92,53,204,0.3)',
      },
    },
  },
  plugins: [],
}
