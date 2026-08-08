/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#060709',
          900: '#0B0D10',
          850: '#111419',
          800: '#181C23',
          700: '#232934',
          600: '#343C4D'
        },
        electric: {
          lime: '#DFFF00',
          yellow: '#F5FF38',
          green: '#00FF66'
        },
        alert: {
          red: '#FF2A4B',
          orange: '#FF7700'
        }
      },
      fontFamily: {
        sans: ['Syne', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Share Tech Mono', 'monospace'],
        display: ['Syne', 'sans-serif']
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'radar-sweep': 'radar 4s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}
