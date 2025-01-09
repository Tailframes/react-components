import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentType } from 'react';
import { Label } from '../components/label';
import { Radio } from '../components/radio/radio';

const meta = {
  title: 'Components/Radio',
  parameters: {
    componentSubtitle:
      'Radio buttons are essential form elements used when users need to select a single option from a set of mutually exclusive choices. These components play a crucial role in ensuring clear and straightforward user interactions, particularly in scenarios requiring a definitive selection.',
  },
  component: Radio,
  subcomponents: { Label: Label as ComponentType<unknown> },
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
