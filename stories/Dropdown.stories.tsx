import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { FlagIcon } from '../assets/flag-icon';
import { GearIcon } from '../assets/gear-icon';
import { UserIcon } from '../assets/user-icon';
import { Avatar } from '../components/avatar';
import { Dropdown } from '../components/dropdown/dropdown';
import { DropdownDivider } from '../components/dropdown/dropdown-divider';
import { DropdownItem } from '../components/dropdown/dropdown-item';
import { DropdownTrigger } from '../components/dropdown/dropdown-trigger';

const meta = {
  title: 'Components/Dropdown',
  parameters: {
    componentSubtitle:
      'The Dropdown or Menu component is a user interface element that provides a list of choices or actions to users. It is often used to display options for a specific task or action, such as a dropdown menu, context menu, or a list of options.',
  },
  component: Dropdown,
  subcomponents: { DropdownTrigger: DropdownTrigger as ComponentType<unknown> },
  decorators: [
    Story => (
      <div className='mx-4'>
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
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const content = (
  <>
    <DropdownItem size='large' startAdornment={<Avatar size='small' shape='square' src='/github-logo.webp' />}>
      GitHub
    </DropdownItem>
    <DropdownItem size='large' startAdornment={<Avatar size='small' shape='square' src='/logo-square.webp' />}>
      Tailframes
    </DropdownItem>
    <DropdownItem size='large' startAdornment={<Avatar size='small' shape='square' src='/spotify-logo.webp' />}>
      Spotify
    </DropdownItem>
    <DropdownDivider />
    <DropdownItem startAdornment={<GearIcon className='size-4' />}>Workspace Settings</DropdownItem>
    <DropdownItem startAdornment={<UserIcon className='size-4' />}>Profile</DropdownItem>
    <DropdownItem startAdornment={<FlagIcon className='size-4' />}>Help</DropdownItem>
    <DropdownDivider />
    <DropdownItem endAdornment={<span>⌘K</span>}>Sign Out</DropdownItem>
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
