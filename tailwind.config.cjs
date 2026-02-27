/** @type {import('tailwindcss').Config} */

const withOpacity = (cssVar) => {
  return ({ opacityValue } = {}) => {
    if (opacityValue === undefined) return `var(${cssVar})`
    const o = Number(opacityValue)
    if (Number.isNaN(o)) return `var(${cssVar})`
    // Works even when the variable already contains a full color function (oklch(...), #fff, etc.)
    return `color-mix(in oklch, var(${cssVar}) ${o * 100}%, transparent)`
  }
}

module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: withOpacity('--border'),
        input: withOpacity('--input'),
        'input-background': withOpacity('--input-background'),
        ring: withOpacity('--ring'),
        background: withOpacity('--background'),
        foreground: withOpacity('--foreground'),

        primary: {
          DEFAULT: withOpacity('--primary'),
          foreground: withOpacity('--primary-foreground'),
        },
        secondary: {
          DEFAULT: withOpacity('--secondary'),
          foreground: withOpacity('--secondary-foreground'),
        },
        destructive: {
          DEFAULT: withOpacity('--destructive'),
          foreground: withOpacity('--destructive-foreground'),
        },
        muted: {
          DEFAULT: withOpacity('--muted'),
          foreground: withOpacity('--muted-foreground'),
        },
        accent: {
          DEFAULT: withOpacity('--accent'),
          foreground: withOpacity('--accent-foreground'),
        },
        popover: {
          DEFAULT: withOpacity('--popover'),
          foreground: withOpacity('--popover-foreground'),
        },
        card: {
          DEFAULT: withOpacity('--card'),
          foreground: withOpacity('--card-foreground'),
        },

        sidebar: {
          DEFAULT: withOpacity('--sidebar'),
          foreground: withOpacity('--sidebar-foreground'),
          primary: withOpacity('--sidebar-primary'),
          'primary-foreground': withOpacity('--sidebar-primary-foreground'),
          accent: withOpacity('--sidebar-accent'),
          'accent-foreground': withOpacity('--sidebar-accent-foreground'),
          border: withOpacity('--sidebar-border'),
          ring: withOpacity('--sidebar-ring'),
        },

        'switch-background': withOpacity('--switch-background'),
        'chart-1': withOpacity('--chart-1'),
        'chart-2': withOpacity('--chart-2'),
        'chart-3': withOpacity('--chart-3'),
        'chart-4': withOpacity('--chart-4'),
        'chart-5': withOpacity('--chart-5'),
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: 'calc(var(--radius) + 4px)',
      },
    },
  },
  plugins: [],
}
