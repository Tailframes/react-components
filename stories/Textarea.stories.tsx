import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../components/textarea';

const meta = {
  title: 'Components/Textarea',
  parameters: {
    componentSubtitle:
      'Textarea elements are essential for user interaction, enabling the input of longer or more detailed responses in web forms and applications. These versatile components are commonly used for entering messages, feedback, or comments, making them crucial in contexts where detailed information is required.',
  },
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Placeholder text...',
    helperText: 'Helper text',
    error: false,
    disabled: false,
    maxLength: 500,
    rows: 5,
    cols: 50,
  },
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'default',
    label: 'Label',
  },
};

export const Disabled: Story = {
  args: {
    id: 'disabled',
    label: 'Label',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    id: 'error',
    label: 'Label',
    defaultValue: 'Invalid value',
    error: true,
  },
};

export const Avatar: Story = {
  args: {
    id: 'avatar',
    label: 'Label',
    defaultValue: '',
    avatar: {
      src: 'https://tailframes.com/images/avatar.webp',
      badge: true,
      size: 'small',
    },
  },
};
