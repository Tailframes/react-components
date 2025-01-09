import { Spinner } from '../components/spinner';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Spinner',
  parameters: {
    componentSubtitle:
      'The Spinner, also known as a loader, is a vital UI element used to visually indicate content loading or processing actions. This dynamic component enhances user experience by providing feedback during wait times, making it an essential tool in maintaining user engagement.',
  },
  component: Spinner,
  tags: ['autodocs'],
  args: {
    size: 'medium',
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
