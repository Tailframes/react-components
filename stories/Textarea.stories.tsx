import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../components/textarea';

const meta = {
  title: 'Components/Textarea',
  parameters: {
    componentSubtitle:
      'Textarea elements are crucial for user interaction, allowing users to input longer or more detailed responses. These versatile components are widely used across various contexts, such as entering detailed messages, feedback, or comments on websites and applications.',
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
