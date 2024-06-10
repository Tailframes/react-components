import type { Meta, StoryObj } from '@storybook/react';
import { IconArgType, IconKey } from '../.storybook/arg-types';
import { Toast } from '../components/toast';

const meta = {
  title: 'Components/Toast',
  parameters: {
    componentSubtitle:
      'A toast, or snack, is a brief message that is displayed temporarily on the screen for a few seconds. It can be used to show success, error, warning, or information messages.',
  },
  component: Toast,
  tags: ['autodocs'],
  args: {
    variant: 'outlined',
    color: 'default',
    children: 'This is a Toast',
  },
  argTypes: {
    startIcon: IconArgType({ className: 'stroke-inherit' }, [
      IconKey.CircleExclamationMarkIcon,
      IconKey.CircleCloseIcon,
      IconKey.CheckboxIcon,
    ]),
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OutlinedDefaultWithIcon: Story = {
  args: {
    startIcon: IconKey.CircleExclamationMarkIcon,
  },
};

export const OutlinedSuccessWithIcon: Story = {
  args: {
    color: 'success',
    startIcon: IconKey.CheckboxIcon,
  },
};

export const OutlinedErrorWithIcon: Story = {
  args: {
    color: 'error',
    startIcon: IconKey.CircleCloseIcon,
  },
};

export const OutlinedWarningWithIcon: Story = {
  args: {
    color: 'warning',
    startIcon: IconKey.CircleExclamationMarkIcon,
  },
};

export const FilledDefaultWithIcon: Story = {
  args: {
    variant: 'filled',
    startIcon: IconKey.CircleExclamationMarkIcon,
  },
};

export const FilledSuccessWithIcon: Story = {
  args: {
    variant: 'filled',
    color: 'success',
    startIcon: IconKey.CheckboxIcon,
  },
};

export const FilledErrorWithIcon: Story = {
  args: {
    variant: 'filled',
    color: 'error',
    startIcon: IconKey.CircleCloseIcon,
  },
};

export const FilledWarningWithIcon: Story = {
  args: {
    variant: 'filled',
    color: 'warning',
    startIcon: IconKey.CircleExclamationMarkIcon,
  },
};

export const OutlinedDefaultTextOnly: Story = {
  args: {},
};

export const FilledDefaultTextOnly: Story = {
  args: {
    variant: 'filled',
  },
};
