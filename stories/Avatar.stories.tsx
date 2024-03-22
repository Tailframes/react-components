import type { Meta, StoryObj } from '@storybook/react';
import { IconArgType, IconKey } from '../.storybook/arg-types';
import { Avatar } from '../components/avatar';

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
    size: 'medium',
    shape: 'circle',
    elevated: false,
  },
  argTypes: {
    icon: IconArgType({ stroke: 'white', fill: 'white' }, [IconKey.StarIcon]),
    elevated: {
      description: 'available only for circle shape without badge',
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Circle: Story = {};

export const Elevated: Story = {
  args: {
    elevated: true,
  },
};

export const Text: Story = {
  args: {
    text: 'Aa',
  },
};

export const Icon: Story = {
  args: {
    icon: 'StarIcon',
  },
};

export const Badge: Story = {
  args: {
    badge: true,
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
  },
};
