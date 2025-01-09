import { IconArgType, IconKey } from '../.storybook/arg-types';
import { Tag } from '../components/tag';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Tag',
  parameters: {
    componentSubtitle:
      'A Tag is a compact, overlapping UI element that effectively highlights the status, notice, or event associated with an underlying object. Despite its small size, this feature plays a significant role in visual communication, offering users quick and clear insights into relevant information.',
  },
  component: Tag,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
  },
  argTypes: {
    startAdornment: IconArgType({ className: 'size-[18px] stroke-inherit' }, [IconKey.CheckIcon, IconKey.CloseIcon]),
    endAdornment: IconArgType({ className: 'size-[18px] stroke-inherit' }, [IconKey.CheckIcon, IconKey.CloseIcon]),
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: 'Outlined',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Error',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning',
  },
};

export const StartAdornment: Story = {
  args: {
    startAdornment: IconKey.CheckIcon,
    children: 'Primary',
  },
};

export const EndAdornment: Story = {
  args: {
    endAdornment: IconKey.CloseIcon,
    children: 'Primary',
  },
};
