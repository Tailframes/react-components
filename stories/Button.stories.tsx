import { IconArgType } from '../.storybook/arg-types';
import { Button } from '../components/button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Button',
  parameters: {
    componentSubtitle:
      'A button with a call-to-action (CTA) is a powerful and dynamic UI component designed to prompt users to take specific actions, such as submitting forms, navigating to other pages, or making purchases. As an interactive element, it plays a crucial role in driving user engagement and achieving desired outcomes within digital interfaces.',
  },
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    disabled: false,
    fullWidth: false,
    iconOnly: false,
    size: 'medium',
    variant: 'primary',
  },
  argTypes: {
    iconOnly: {
      control: { type: 'boolean' },
    },
    startAdornment: IconArgType({}),
    endAdornment: IconArgType({}),
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
