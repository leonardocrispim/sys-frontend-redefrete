/** @type {import('tailwindcss').Config} */

import { colors } from 'tailwindcss/colors';

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rede: {
          DEFAULT: '#c42124',
          gray: {
            DEFAULT: '#beb1b2',
            100: '#111',
            200: '#333',
            300: '#515151',
            400: '#999',
            500: '#aaa',
            600: '#dfdfdf',
            700: '#efefef',
          },
          red: {
            100: '#4f0c0d',
            200: '#68191a',
            300: '#a31214',
            400: '#b41d1f',
            500: '#d44244',
            600: '#FF9393',
            700: '#FFB0AE',
            800: '#FFCFCD',
            900: '#FEEEEC',
          },
          green: {
            DEFAULT: '#0ca449',
            100: '#1E5932',
            200: '#46815e',
            300: '#439163',
            400: '#34bb6b',
            500: '#0acf5a',
            600: '#82e7ab',
            700: '#bbf2d1',
            800: '#dff9ea',
          },
          blue: {
            DEFAULT: '#336699',
            100: '#234d77',
            200: '#205a94',
            300: '#1f64a9',
            400: '#1c6dbe',
            500: '#0879eb',
            600: '#a7bdd3',
            700: '#cedae7',
            800: '#dae3ed',
            900: '#e9eef4',
          },
          yellow: {
            DEFAULT: '#ffc700',
            100: '#7f6507',
            200: '#977808',
            300: '#aa870b',
            400: '#bb940a',
            500: '#c39a0a',
            600: '#dfb10c',
            700: '#e8b80c',
            800: '#f7ca2a',
            900: '#ffde6a',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
