import { Checkbox } from '../components/checkbox';
import type { Meta, StoryObj } from '@storybook/react';
const meta = {
  title: 'Components/Checkbox',
  parameters: {
    componentSubtitle:
      'A checkbox is a simple yet essential UI component displayed as a small square, offering two states: checked and unchecked. It allows users to select one or multiple options from a list, making it a versatile tool for forms, surveys, and settings within applications.',
  },
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    size: 'medium',
    disabled: false,
    indeterminate: false,
  },
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
    name: {
      table: {
        disable: true,
      },
    },
    defaultChecked: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'default',
    label: 'Default',
  },
};

export const Checked: Story = {
  args: {
    name: 'checked',
    label: 'Checked',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    name: 'indeterminate',
    label: 'Indeterminate',
    indeterminate: true,
  },
};
