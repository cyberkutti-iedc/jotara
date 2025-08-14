/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/renderer/index.html',
    './src/renderer/src/**/*.{js,ts,jsx,tsx}',
    './src/preload/**/*.{js,ts}',
    './src/main/**/*.{js,ts}'
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace'
        ]
      },
      colors: {
        glass: {
          50: 'rgba(255, 255, 255, 0.9)',
          100: 'rgba(255, 255, 255, 0.8)',
          200: 'rgba(255, 255, 255, 0.6)',
          300: 'rgba(255, 255, 255, 0.4)',
          400: 'rgba(255, 255, 255, 0.3)',
          500: 'rgba(255, 255, 255, 0.2)',
          600: 'rgba(255, 255, 255, 0.1)',
          700: 'rgba(255, 255, 255, 0.05)',
          800: 'rgba(0, 0, 0, 0.05)',
          900: 'rgba(0, 0, 0, 0.1)'
        },
        dark: {
          glass: {
            50: 'rgba(0, 0, 0, 0.9)',
            100: 'rgba(0, 0, 0, 0.8)',
            200: 'rgba(0, 0, 0, 0.6)',
            300: 'rgba(0, 0, 0, 0.4)',
            400: 'rgba(0, 0, 0, 0.3)',
            500: 'rgba(0, 0, 0, 0.2)',
            600: 'rgba(0, 0, 0, 0.1)',
            700: 'rgba(0, 0, 0, 0.05)',
            800: 'rgba(255, 255, 255, 0.05)',
            900: 'rgba(255, 255, 255, 0.1)'
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'glass-gradient-dark': 'linear-gradient(135deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.1) 100%)'
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
        '5xl': '96px'
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shine': 'shine 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-subtle': 'bounceSubtle 1s ease-in-out infinite',
        'rotate-slow': 'rotate 8s linear infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(99, 102, 241, 0.3), 0 0 10px rgba(99, 102, 241, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.6), 0 0 30px rgba(99, 102, 241, 0.4)' 
          }
        },
        shine: {
          '0%': { transform: 'translateX(-200%) skewX(-12deg)' },
          '100%': { transform: 'translateX(200%) skewX(-12deg)' }
        },
        bounceSubtle: {
          '0%, 100%': { 
            transform: 'translateY(-5%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' 
          },
          '50%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' 
          }
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 10px 40px 0 rgba(0, 0, 0, 0.15)',
        'glass-xl': '0 20px 60px 0 rgba(0, 0, 0, 0.2)',
        'glass-2xl': '0 25px 80px 0 rgba(0, 0, 0, 0.25)',
        'glass-inner': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.4)',
        'neon': '0 0 5px currentColor, 0 0 10px currentColor, 0 0 20px currentColor',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100'
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Custom plugin for glass morphism utilities
    function({ addUtilities, addBase, theme }) {
      const glassUtilities = {
        '.glass': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)'
        },
        '.glass-dark': {
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
        },
        '.glass-strong': {
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)'
        },
        '.glass-subtle': {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.05)'
        },
        '.frosted': {
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.25)'
        }
      }

      const scrollbarUtilities = {
        '.scrollbar-hidden': {
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        },
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '3px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgba(255, 255, 255, 0.3)'
          }
        }
      }

      const textUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
        },
        '.text-shadow': {
          textShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
        },
        '.text-shadow-lg': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
        }
      }

      addUtilities({
        ...glassUtilities,
        ...scrollbarUtilities,
        ...textUtilities
      })

      // Base styles for better transparency support
      addBase({
        'html, body': {
          background: 'transparent',
          fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
          fontVariantNumeric: 'oldstyle-nums',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale'
        }
      })
    }
  ]
}