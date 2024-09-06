import type { Meta, StoryObj } from '@storybook/react';
import { IconArgType, IconKey } from '../.storybook/arg-types';
import { Input } from '../components/input';

const meta = {
  title: 'Components/Input',
  parameters: {
    componentSubtitle:
      'Input fields are fundamental elements in user interface design, allowing users to enter and submit various types of information. Whether used for collecting personal details, shipping addresses, or online inquiries, these versatile components are integral to forms and interactive elements across diverse applications.',
  },
  component: Input,
  decorators: [
    Story => (
      <div style={{ maxWidth: '24rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    placeholder: 'Text Field',
    helperText: 'Helper text',
    size: 'medium',
    error: false,
    disabled: false,
  },
  argTypes: {
    endAdornment: IconArgType({ className: 'size-5', stroke: 'inherit' }, [IconKey.CloseIcon]),
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
    size: {
      control: {
        type: 'inline-radio',
      },
    },
    startAdornment: IconArgType({ className: 'size-5', stroke: 'inherit' }, [IconKey.UserIcon]),
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Error',
    defaultValue: 'Invalid value',
    error: true,
  },
};

export const Adornments: Story = {
  args: {
    label: 'Adornments',
    startAdornment: IconKey.UserIcon,
    endAdornment: IconKey.CloseIcon,
  },
};
