import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../components/radio';

const meta = {
  title: 'Components/Radio',
  parameters: {
    componentSubtitle:
      'Radio buttons constitute a vital component within forms, serving their purpose when users need to select precisely one option from a list featuring two or more mutually exclusive possibilities.',
  },
  component: Radio,
  tags: ['autodocs'],
  args: {
    size: 'medium',
    disabled: false,
  },
  argTypes: {
    id: {
      table: {
        disable: true,
      },
    },
    labelProps: {
      description: 'HTML attributes for the label element',
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
  },
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'default',
    name: 'default',
    label: 'Default',
  },
};

export const Checked: Story = {
  args: {
    id: 'checked',
    name: 'checked',
    label: 'Checked',
    defaultChecked: true,
  },
};
