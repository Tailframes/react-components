import { type ComponentType } from 'react';
import { UserIcon } from '../assets/user-icon';
import { Tab } from '../components/tabs/tab';
import { Tabs } from '../components/tabs/tabs';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Tabs',
  parameters: {
    componentSubtitle:
      'Tabs are a crucial navigational component in web design, offering users a convenient way to access different sections of a website or various segments within a single page. This user-friendly feature enhances the organization and accessibility of content, making it easier for users to navigate complex interfaces.',
  },
  component: Tabs,
  subcomponents: {
    Tab: Tab as ComponentType<unknown>,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

const startAdornment = <UserIcon stroke='inherit' />;

export const TextOnly: Story = {
  args: {
    items: [
      {
        label: 'Tab 1',
        value: '1',
        content: 'Content of tab 1',
      },
      {
        label: 'Tab 2',
        value: '2',
        content: 'Content of tab 2',
      },
      {
        label: 'Tab 3',
        value: '3',
        content: 'Content of tab 3',
      },
    ],
  },
};

export const StartAdornment: Story = {
  args: {
    items: [
      {
        label: 'Tab 1',
        value: '1',
        content: 'Content of tab 1',
        startAdornment,
      },
      {
        label: 'Tab 2',
        value: '2',
        content: 'Content of tab 2',
        startAdornment,
      },
      {
        label: 'Tab 3',
        value: '3',
        content: 'Content of tab 3',
        startAdornment,
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
        label: 'Tab 1',
        value: '1',
      },
      {
        badge: {
          children: 100,
        },
        content: 'Content of tab 2',
        label: 'Tab 2',
        value: '2',
      },
      {
        badge: {
          children: 100,
        },
        content: 'Content of tab 3',
        label: 'Tab 3',
        value: '3',
      },
    ],
  },
};

export const WithDisabledTabs: Story = {
  args: {
    items: [
      {
        content: 'Content of tab 1',
        label: 'Tab 1',
        value: '1',
      },
      {
        content: 'Content of tab 2',
        disabled: true,
        label: 'Tab 2',
        value: '2',
      },
      {
        content: 'Content of tab 3',
        disabled: true,
        label: 'Tab 3',
        value: '3',
      },
      {
        content: 'Content of tab 4',
        label: 'Tab 4',
        value: '4',
      },
    ],
  },
};
