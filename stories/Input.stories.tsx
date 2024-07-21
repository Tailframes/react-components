import type { Meta, StoryObj } from '@storybook/react';
import { IconArgType, IconKey } from '../.storybook/arg-types';
import { Input } from '../components/input';

const meta = {
  title: 'Components/Input',
  parameters: {
    componentSubtitle:
      'Input fields play a pivotal role in user interface design by enabling users to input unconventional responses. These essential components find application in diverse contexts, with common instances being the input of personal details and shipping addresses in e-commerce web forms or the submission of online inquiries.',
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
    containerClassName: {
      table: {
        disable: true,
      },
    },
    endIcon: IconArgType({ className: 'size-5', stroke: 'inherit' }, [IconKey.CloseIcon]),
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
    startIcon: IconArgType({ className: 'size-5', stroke: 'inherit' }, [IconKey.UserIcon]),
    value: {
      table: {
        disable: true,
      },
    },
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

export const Icons: Story = {
  args: {
    label: 'Icons',
    startIcon: IconKey.UserIcon,
    endIcon: IconKey.CloseIcon,
  },
};
