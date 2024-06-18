import { IconArgType, IconKey } from '../.storybook/arg-types';
import { Tag } from '../components/tag';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Tag',
  parameters: {
    componentSubtitle:
      'A tag, a compact overlapping UI element, showcases the status, notice, or event related to the underlying object.',
  },
  component: Tag,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
  },
  argTypes: {
    startIcon: IconArgType({ className: 'size-[18px] stroke-inherit' }, [IconKey.CheckIcon, IconKey.CloseIcon]),
    endIcon: IconArgType({ className: 'size-[18px] stroke-inherit' }, [IconKey.CheckIcon, IconKey.CloseIcon]),
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

export const StartIcon: Story = {
  args: {
    startIcon: IconKey.CheckIcon,
    children: 'Primary',
  },
};

export const EndIcon: Story = {
  args: {
    endIcon: IconKey.CloseIcon,
    children: 'Primary',
  },
};
