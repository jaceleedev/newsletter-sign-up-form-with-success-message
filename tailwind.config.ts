import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-navy': '#242742',
        'pale-navy': '#36384D',
        vermellion: '#FF6155',
      },
      fontFamily: {
        roboto: ['var(--font-roboto)'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(204deg, #FF6A3A 0%, #FF527B 100%)',
      },
      boxShadow: {
        primary: '0 16px 32px 0 rgba(255, 97, 85, 0.50)',
      },
    },
  },
  plugins: [
    plugin(function ({ theme, addUtilities }) {
      const typographyUtilities = {
        '.text-heading': {
          fontFamily: theme('fontFamily.roboto') ?? 'var(--font-roboto)',
          fontSize: '40px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '100%',
          fontFeatureSettings: `'clig' off, 'liga' off`,
          '@screen lg': {
            fontSize: '56px',
          },
        },
        '.text-body': {
          fontFamily: theme('fontFamily.roboto') ?? 'var(--font-roboto)',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '150%',
          fontFeatureSettings: `'clig' off, 'liga' off`,
        },
        '.text-body-small': {
          fontFamily: theme('fontFamily.roboto') ?? 'var(--font-roboto)',
          fontSize: '12px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '150%',
          fontFeatureSettings: `'clig' off, 'liga' off`,
        },
        '.text-body-bold': {
          fontFamily: theme('fontFamily.roboto') ?? 'var(--font-roboto)',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: '700',
          lineHeight: '150%',
          fontFeatureSettings: `'clig' off, 'liga' off`,
        },
      };

      addUtilities(typographyUtilities);
    }),
  ],
};
export default config;
