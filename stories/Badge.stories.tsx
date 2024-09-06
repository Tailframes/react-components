import { Badge } from '../components/badge';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Badge',
  parameters: {
    componentSubtitle:
      'A badge, also known as a tag, is a compact overlapping UI element designed to display a status, notification, or event related to the underlying object. This versatile component effectively draws attention to important information, such as unread messages, alerts, or user statuses, making it an essential part of modern interfaces.',
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

export const DotAndLabel: Story = {
  args: {
    dotOnly: true,
    label: 'Default',
  },
};
