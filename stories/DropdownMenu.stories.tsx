import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { FlagIcon } from '../assets/flag-icon';
import { GearIcon } from '../assets/gear-icon';
import { UserIcon } from '../assets/user-icon';
import { Avatar } from '../components/avatar';
import { DropdownMenu } from '../components/dropdown-menu/dropdown-menu';
import { DropdownMenuDivider } from '../components/dropdown-menu/dropdown-menu-divider';
import { DropdownMenuItem } from '../components/dropdown-menu/dropdown-menu-item';
import { DropdownMenuTrigger } from '../components/dropdown-menu/dropdown-menu-trigger';

const meta = {
  title: 'components/Dropdown Menu',
  parameters: {
    componentSubtitle:
      'The Dropdown Menu component is a user interface element that provides a list of choices or actions to users. It is often used to display options for a specific task or action, such as a dropdown menu, context menu, or a list of options.',
  },
  component: DropdownMenu,
  subcomponents: {
    DropdownTrigger: DropdownMenuTrigger as ComponentType<unknown>,
    DropdownItem: DropdownMenuItem as ComponentType<unknown>,
    DropdownDivider: DropdownMenuDivider as ComponentType<unknown>,
  },
  decorators: [
    Story => (
      <div className='mx-4 mb-44 mt-4'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    triggerButtonProps: {
      children: 'Toggle Menu',
      size: 'small',
    },
  },
  argTypes: {
    containerClassName: {
      table: {
        disable: true,
      },
    },
    dropdownClassName: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const content = (
  <>
    <DropdownMenuItem
      size='large'
      startAdornment={<Avatar size='small' shape='square' src='/github-logo.webp' />}
      href='https://github.com/Tailframes/react-components'
    >
      GitHub
    </DropdownMenuItem>
    <DropdownMenuItem
      size='large'
      startAdornment={<Avatar size='small' shape='square' src='/logo-square.webp' />}
      href='www.tailframes.com'
    >
      Tailframes
    </DropdownMenuItem>
    <DropdownMenuItem size='large' startAdornment={<Avatar size='small' shape='square' src='/spotify-logo.webp' />}>
      Spotify
    </DropdownMenuItem>
    <DropdownMenuDivider />
    <DropdownMenuItem
      startAdornment={<GearIcon className='size-4' />}
      onClick={() => {
        alert('Settings redirect');
      }}
    >
      Workspace Settings
    </DropdownMenuItem>
    <DropdownMenuItem startAdornment={<UserIcon className='size-4' />}>Profile</DropdownMenuItem>
    <DropdownMenuItem startAdornment={<FlagIcon className='size-4' />}>Help</DropdownMenuItem>
    <DropdownMenuDivider />
    <DropdownMenuItem endAdornment={<span>⌘K</span>}>Sign Out</DropdownMenuItem>
  </>
);

export const Default: Story = {
  args: {
    width: 200,
    children: content,
  },
};

export const CustomTrigger: Story = {
  args: {
    alignment: 'left',
    children: content,
    width: 200,
    triggerButtonProps: {
      customComponent: true,
      children: <Avatar src='https://tailframes.com/images/avatar.webp' size='small' />,
    },
  },
};
