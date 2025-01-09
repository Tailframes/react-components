import type { Preview } from '@storybook/react';
import './styles.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
      controls: {
        sort: 'requiredFirst',
      },
    },
  },
};

export default preview;
