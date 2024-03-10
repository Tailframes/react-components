import { StarIcon } from '../assets/star-icon';
import { Button } from '../components/button';
import type { ArgTypes, Meta, StoryObj } from '@storybook/react';

const Icons = {
  StarIcon: <StarIcon className='fill-inherit stroke-inherit' />,
};
const IconsKeys = Object.keys(Icons);
const IconArgType: ArgTypes = {
  options: [null, ...IconsKeys],
  mapping: {
    ...Icons,
    null: null,
  },
};

///

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
    size: 'medium',
    variant: 'primary',
  },
  argTypes: {
    iconOnly: {
      description: 'removing the horizontal padding for icon only buttons',
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    startIcon: IconArgType,
    endIcon: IconArgType,
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
