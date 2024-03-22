import { Spinner } from '../components/spinner';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Spinner',
  parameters: {
    componentSubtitle:
      'The spinner, also known as a loader, is a frequently employed interface element designed to replicate the visual representation of content loading actions.',
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
