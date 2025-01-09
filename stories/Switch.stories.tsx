import type { Meta, StoryObj } from '@storybook/react';
import { IconArgType, IconKey } from '../.storybook/arg-types';
import { Switch } from '../components/switch';

const meta = {
  title: 'Components/Switch',
  parameters: {
    componentSubtitle:
      'The Switch, also known as a toggle, is a user interface control that allows users to toggle between two mutually exclusive states, such as ON and OFF. Inspired by the functionality of a physical switch, this intuitive component mimics the action of turning settings or features on and off, making it a familiar and effective tool in digital interfaces.',
  },
  component: Switch,
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
    uncheckedIcon: IconArgType({ className: 'size-[18px]', stroke: 'inherit' }, [IconKey.CheckIcon, IconKey.CloseIcon]),
    checkedIcon: IconArgType({ className: 'size-[18px]', stroke: 'inherit' }, [IconKey.CheckIcon, IconKey.CloseIcon]),
    size: {
      control: {
        type: 'inline-radio',
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'default',
    label: 'Default',
  },
};

export const Disabled: Story = {
  args: {
    name: 'disabled',
    label: 'Disabled',
    disabled: true,
  },
};

export const Icon: Story = {
  args: {
    name: 'icon',
    label: 'Icon',
    checkedIcon: IconKey.CheckIcon,
    uncheckedIcon: IconKey.CloseIcon,
  },
};

export const Text: Story = {
  args: {
    name: 'text',
    label: 'Text',
    checkedText: '1',
    uncheckedText: '0',
  },
};
