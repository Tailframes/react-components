import { Badge } from '../components/badge';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Badge',
  parameters: {
    componentSubtitle:
      'A badge, sometimes referred to as a tag, is a compact overlapping UI element designed to showcase a status, notification, or event associated with the underlying object.',
  },
  component: Badge,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    dotOnly: false,
    size: 'medium',
    children: 100,
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
};

export const Dot: Story = {
  args: {
    dotOnly: true,
    label: 'Default',
  },
};
