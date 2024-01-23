import type { Config } from 'tailwindcss';
import tailwindForms from '@tailwindcss/forms';

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [tailwindForms()],
};

export default config;
