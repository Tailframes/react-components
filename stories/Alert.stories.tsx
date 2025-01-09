import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { IconArgType, IconKey } from '../.storybook/arg-types';
import { Alert } from '../components/alert';
import { Avatar } from '../components/avatar';
import { Button } from '../components/button';

const meta = {
  title: 'Components/Alert',
  parameters: {
    componentSubtitle:
      'An alert, or notification, is a crucial UI element used to inform users about important actions, events, or updates.',
  },
  component: Alert,
  subcomponents: { Avatar: Avatar as ComponentType<unknown> },
  tags: ['autodocs'],
  args: {
    title: 'Notification',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    fullWidth: false,
    onClose: () => {},
    children: (
      <Button variant='text' className='p-0' size='small'>
        Confirm
      </Button>
    ),
  },
  argTypes: {
    children: {
      control: false,
    },
    startAdornment: IconArgType({ className: 'stroke-blue-700' }, [
      IconKey.CircleExclamationMarkIcon,
      IconKey.CircleCloseIcon,
      IconKey.CheckboxIcon,
    ]),
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {};

export const WithStartAdornment: Story = {
  args: {
    startAdornment: IconKey.CircleExclamationMarkIcon,
  },
};

export const WithAvatar: Story = {
  args: {
    avatar: {
      src: 'https://tailframes.com/images/avatar.webp',
      size: 'small',
    },
  },
};
