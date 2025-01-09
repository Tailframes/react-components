import { type Meta, type StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { GearIcon } from '../assets/gear-icon';
import { HomeIcon } from '../assets/home-icon';
import { UsersIcon } from '../assets/users-icon';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { BreadcrumbsItem } from '../components/breadcrumbs/breadcrumbs-item';

const meta = {
  title: 'Components/Breadcrumbs',
  parameters: {
    componentSubtitle:
      'Breadcrumbs are essential navigation aids that guide users through websites or applications, providing clear, traceable pathways to help them understand their journey and location within a site. Particularly valuable in complex platforms such as e-commerce websites or content-rich portals, breadcrumbs enhance user experience by simplifying navigation and reducing the effort required to explore and revisit pages.',
  },
  component: Breadcrumbs,
  subcomponents: {
    BreadcrumbsItem: BreadcrumbsItem as ComponentType<unknown>,
  },
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
