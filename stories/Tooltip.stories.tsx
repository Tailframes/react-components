import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../components/tooltip';

const meta = {
  title: 'Components/Tooltip',
  parameters: {
    componentSubtitle:
      'A tooltip is a concise and informative message that emerges when a user engages with an element within a graphical user interface (GUI). Activation of tooltips commonly occurs through either a mouse-hover action or a keyboard-hover gesture.',
    layout: 'centered',
  },
  decorators: [
    Story => (
      <div style={{ margin: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    size: 'medium',
    placement: 'top',
    showArrow: true,
    value: 'Tooltip',
    children: (
      <span className='flex size-6 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white'>
        i
      </span>
    ),
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    variant: {
      control: {
        type: 'inline-radio',
      },
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    size: {
      control: {
        type: 'inline-radio',
      },
      table: {
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    showArrow: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const WithoutArrow: Story = {
  args: {
    showArrow: false,
  },
};
