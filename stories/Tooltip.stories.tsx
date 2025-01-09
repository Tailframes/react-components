import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../components/tooltip';

const meta = {
  title: 'Components/Tooltip',
  parameters: {
    componentSubtitle:
      'A Tooltip is a concise, informative message that appears when a user interacts with an element in a graphical user interface (GUI), typically triggered by a mouse hover or keyboard focus. This user-friendly feature provides additional context or guidance without cluttering the interface, making it easier for users to understand and navigate complex elements.',
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
