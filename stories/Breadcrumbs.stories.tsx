import { type Meta, type StoryObj } from '@storybook/react';
import { GearIcon } from '../assets/gear-icon';
import { HomeIcon } from '../assets/home-icon';
import { UserIcon } from '../assets/user-icon';
import { Breadcrumbs } from '../components/breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  parameters: {
    componentSubtitle:
      'Breadcrumbs are integral navigation aids in user interfaces, providing users with clear paths to track their journey through websites or applications. These navigational elements are essential for user experience, particularly in complex websites with deep hierarchies like e-commerce platforms or content-rich portals.',
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
        icon: <HomeIcon className='size-3.5' />,
        href: '/',
      },
      {
        label: 'Settings',
        icon: <GearIcon className='size-3.5' />,
        href: '/settings',
      },
      {
        label: 'Users',
        icon: <UserIcon className='size-3.5' />,
        href: '/settings/users',
      },
    ],
  },
};

export const Icon: Story = {
  args: {
    items: [
      {
        icon: <HomeIcon className='size-3.5' />,
        href: '/',
      },
      {
        icon: <GearIcon className='size-3.5' />,
        href: '/settings',
      },
      {
        icon: <UserIcon className='size-3.5' />,
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
        icon: <HomeIcon className='size-3.5' />,
        href: '/',
      },
      {
        label: 'Settings',
        icon: <GearIcon className='size-3.5' />,
        href: '/settings',
      },
      {
        label: 'Users',
        icon: <UserIcon className='size-3.5' />,
        href: '/settings/users',
      },
      {
        label: 'John Wick',
        href: '/settings/users/1',
      },
    ],
  },
};
