import { UserIcon } from '../assets/user-icon';
import { Tabs } from '../components/tabs';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Tabs',
  parameters: {
    componentSubtitle:
      'Tabs serve as a navigational component in web design, providing users with a convenient way to access various sections of a site or different segments within an individual page.',
  },
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    name: {
      table: {
        disable: true,
      },
    },
    items: {
      description:
        'an array of tab items with allowed properties: **label**, **content**, **badge**, **disabled**, **startIcon**\n',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const startIcon = <UserIcon stroke='inherit' />;

export const TextOnly: Story = {
  args: {
    items: [
      {
        label: 'Tab 1',
        content: 'Content of tab 1',
      },
      {
        label: 'Tab 2',
        content: 'Content of tab 2',
      },
      {
        label: 'Tab 3',
        content: 'Content of tab 3',
      },
      {
        label: 'Tab 4',
        content: 'Content of tab 4',
      },
      {
        label: 'Tab 5',
        content: 'Content of tab 5',
        disabled: true,
      },
    ],
  },
};

export const Icon: Story = {
  args: {
    items: [
      {
        label: 'Tab 1',
        content: 'Content of tab 1',
        startIcon,
      },
      {
        label: 'Tab 2',
        content: 'Content of tab 2',
        startIcon,
      },
      {
        label: 'Tab 3',
        content: 'Content of tab 3',
        startIcon,
      },
      {
        label: 'Tab 4',
        content: 'Content of tab 4',
        startIcon,
      },
      {
        label: 'Tab 5',
        content: 'Content of tab 5',
        startIcon,
        disabled: true,
      },
    ],
  },
};

export const Badge: Story = {
  args: {
    items: [
      {
        badge: {
          children: 100,
        },
        content: 'Content of tab 1',
        disabled: false,
        label: 'Tab 1',
      },
      {
        badge: {
          children: 100,
        },
        content: 'Content of tab 2',
        disabled: false,
        label: 'Tab 2',
      },
      {
        badge: {
          children: 100,
        },
        content: 'Content of tab 3',
        disabled: false,
        label: 'Tab 3',
      },
      {
        badge: {
          children: 100,
        },
        content: 'Content of tab 4',
        disabled: false,
        label: 'Tab 4',
      },
      {
        badge: {
          children: 100,
        },
        content: 'Content of tab 5',
        disabled: true,
        label: 'Tab 5',
      },
    ],
  },
};
