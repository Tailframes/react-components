import type { Meta, StoryObj } from '@storybook/react';
import { IconArgType, IconKey } from '../.storybook/arg-types';
import { Alert } from '../components/alert';
import { Button } from '../components/button';

const meta = {
  title: 'Components/Alert',
  parameters: {
    componentSubtitle:
      'An alert, or a notification is used to communicate the user about an important action or event.',
  },
  component: Alert,
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
    startIcon: IconArgType({ className: 'stroke-blue-700' }, [
      IconKey.CircleExclamationMarkIcon,
      IconKey.CircleCloseIcon,
      IconKey.CheckboxIcon,
    ]),
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TextOnly: Story = {};

export const WithIcon: Story = {
  args: {
    startIcon: IconKey.CircleExclamationMarkIcon,
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
