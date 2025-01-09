import type { Config } from 'tailwindcss';
import tailwindForms from '@tailwindcss/forms';
import tailwindScrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './stories/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [tailwindForms(), tailwindScrollbar],
};

export default config;
