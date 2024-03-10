import { Avatar } from '../components/avatar';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Avatar',
  parameters: {
    componentSubtitle:
      "An avatar serves as a visual representation of the user's identity on screens, commonly featured in various applications such as business software, social media platforms, and video games.",
  },
  component: Avatar,
  tags: ['autodocs'],
  args: {
    src: 'https://tailframes.com/images/avatar.webp',
  },
  argTypes: {
    icon: {
      control: { type: 'boolean' },
    },
    elevated: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Circle: Story = {};
