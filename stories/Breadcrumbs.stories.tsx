import { type Meta, type StoryObj } from '@storybook/react';
import { GearIcon } from '../assets/gear-icon';
import { HomeIcon } from '../assets/home-icon';
import { UsersIcon } from '../assets/users-icon';
import { Breadcrumbs } from '../components/breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  parameters: {
    componentSubtitle:
      'Breadcrumbs play a crucial role in guiding users through websites or applications, offering clear pathways to trace their progress. They are especially vital for user experience, notably in intricate platforms like e-commerce websites or content-heavy portals, where they significantly improve navigation.',
  },
  component: Breadcrumbs,
  tags: ['autodocs'],
  args: {
    separator: 'chevron',
    maxItems: 6,
  },
  argTypes: {
    separator: {
      options: ['slash', 'chevron'],
      control: { type: 'inline-radio' },
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        icon: 'Dashboard',
        href: '/',
      },
      {
        label: 'Settings',
        href: '/settings',
      },
      {
        label: 'Users',
        href: '/settings/users',
      },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    separator: 'slash',
    items: [
      {
        icon: 'Dashboard',
        href: '/',
      },
      {
        label: 'Settings',
        href: '/settings',
      },
      {
        label: 'Users',
        href: '/settings/users',
      },
    ],
  },
};

export const LabelWithIcon: Story = {
  args: {
    items: [
      {
        label: 'Dashboard',
        icon: <HomeIcon className='size-4' />,
        href: '/',
      },
      {
        label: 'Settings',
        icon: <GearIcon className='size-4' />,
        href: '/settings',
      },
      {
        label: 'Users',
        icon: <UsersIcon className='size-4' />,
        href: '/settings/users',
      },
    ],
  },
};

export const Icon: Story = {
  args: {
    items: [
      {
        icon: <HomeIcon className='size-4' />,
        href: '/',
      },
      {
        icon: <GearIcon className='size-4' />,
        href: '/settings',
      },
      {
        label: 'Users',
        icon: <UsersIcon className='size-4' />,
        href: '/settings/users',
      },
    ],
  },
};

export const Collapsed: Story = {
  args: {
    maxItems: 2,
    items: [
      {
        label: 'Dashboard',
        icon: <HomeIcon className='size-4' />,
        href: '/',
      },
      {
        label: 'Settings',
        icon: <GearIcon className='size-4' />,
        href: '/settings',
      },
      {
        label: 'Users',
        icon: <UsersIcon className='size-4' />,
        href: '/settings/users',
      },
      {
        label: 'John Wick',
        href: '/settings/users/1',
      },
    ],
  },
};
