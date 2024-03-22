import type { Meta, StoryObj } from '@storybook/react';
import { IconArgType, IconKey } from '../.storybook/arg-types';
import { Switch } from '../components/switch';

const meta = {
  title: 'Components/Switch',
  parameters: {
    componentSubtitle:
      'A switch, occasionally referred to as a "toggle", is a user interface control featuring two states that are mutually exclusive, like ON and OFF. Modeled after a physical switch, this control\'s appearance and functionality emulate the action of users turning things on and off.',
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
      table: {
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  args: {
    name: 'default',
    label: 'Default',
  },
};

export const Disabled: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  args: {
    name: 'disabled',
    label: 'Disabled',
    disabled: true,
  },
};

export const Icon: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  args: {
    name: 'icon',
    label: 'Icon',
    checkedIcon: IconKey.CheckIcon,
    uncheckedIcon: IconKey.CloseIcon,
  },
};

export const Text: Story = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  args: {
    name: 'text',
    label: 'Text',
    checkedText: '1',
    uncheckedText: '0',
  },
};
