import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", md: "2rem" },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        /* THP Brand Colors */
        thp: {
          primary: "hsl(var(--thp-primary))",
          "primary-dark": "hsl(var(--thp-primary-dark))",
          cta: "hsl(var(--thp-cta))",
          danger: "hsl(var(--thp-danger))",
          success: "hsl(var(--thp-success))",
          text: "hsl(var(--thp-text))",
          muted: "hsl(var(--thp-muted))",
          bg: "hsl(var(--thp-bg))",
          "bg-soft": "hsl(var(--thp-bg-soft))",
          hover: "hsl(var(--thp-hover))",
        },
        /* Shadcn Semantic Colors */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "0.75rem",
        "2xl": "1rem"
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.06), 0 1px 3px rgba(16,24,40,0.1)"
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-sans)']
      },
      fontSize: {
        'h1': ['var(--text-h1)', { lineHeight: 'var(--text-h1-lh)', fontWeight: 'var(--text-h1-weight)' }],
        'h2': ['var(--text-h2)', { lineHeight: 'var(--text-h2-lh)', fontWeight: 'var(--text-h2-weight)' }],
        'h3': ['var(--text-h3)', { lineHeight: 'var(--text-h3-lh)', fontWeight: 'var(--text-h3-weight)' }],
        'h4': ['var(--text-h4)', { lineHeight: 'var(--text-h4-lh)', fontWeight: 'var(--text-h4-weight)' }],
        'h5': ['var(--text-h5)', { lineHeight: 'var(--text-h5-lh)', fontWeight: 'var(--text-h5-weight)' }],
        'h6': ['var(--text-h6)', { lineHeight: 'var(--text-h6-lh)', fontWeight: 'var(--text-h6-weight)' }],
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
