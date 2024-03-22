import { IconArgType } from '../.storybook/arg-types';
import { Button } from '../components/button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Button',
  parameters: {
    componentSubtitle:
      'A button with a call-to-action (CTA) is a dynamic component within a user interface, motivating users to perform specific actions.',
  },
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    fullWidth: false,
    iconOnly: false,
    size: 'medium',
    variant: 'primary',
  },
  argTypes: {
    iconOnly: {
      description: 'removes the horizontal padding from the button',
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    startIcon: IconArgType({}),
    endIcon: IconArgType({}),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined',
    variant: 'outlined',
  },
};

export const Text: Story = {
  args: {
    children: 'Text',
    variant: 'text',
  },
};

export const TextDefault: Story = {
  args: {
    children: 'Text Default',
    variant: 'text-default',
  },
};
