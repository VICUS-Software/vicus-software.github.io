/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#6adcad',
        secondary: '#2c2626',
        tertiary: '#1446a0',
        background: '#041d25',
        foreground: '#F2F6F6',
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.foreground'),
            '--tw-prose-headings': theme('colors.foreground'),
            '--tw-prose-links': theme('colors.primary'),
            '--tw-prose-bold': theme('colors.foreground'),
            '--tw-prose-bullets': theme('colors.primary'),
            '--tw-prose-quotes': theme('colors.foreground'),
            '--tw-prose-code': theme('colors.primary'),
            '--tw-prose-hr': theme('colors.primary'),
            '--tw-prose-th-borders': theme('colors.primary'),
            lineHeight: '1.75',
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.foreground'),
            '--tw-prose-headings': theme('colors.foreground'),
            '--tw-prose-links': theme('colors.primary'),
            '--tw-prose-bold': theme('colors.foreground'),
            '--tw-prose-bullets': theme('colors.primary'),
            '--tw-prose-quotes': theme('colors.foreground'),
            '--tw-prose-code': theme('colors.primary'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
