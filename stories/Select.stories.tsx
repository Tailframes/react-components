import type { Meta, StoryObj } from '@storybook/react';
import { UserIcon } from '../assets/user-icon';
import { Select, type SelectOptionType } from '../components/select';

const options = Array.from({ length: 3 }, (_, i) => ({
  label: `Label ${i + 1}`,
  value: i + 1,
}));

const meta = {
  title: 'Components/Select',
  parameters: {
    componentSubtitle:
      'A select, or a dropdown, is a form control that allows a user to select a value from a list of options. It is used to allow users to choose one or more items from a list of options.',
  },
  component: Select,
  decorators: [
    Story => (
      <div className='max-w-[240px]'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    checkboxes: true,
    clearable: true,
    disabled: false,
    error: false,
    label: 'Label',
    multiple: false,
    options,
    placeholder: 'Select',
    size: 'medium',
  },
  argTypes: {
    buttonClassName: {
      table: {
        disable: true,
      },
    },
    containerClassName: {
      table: {
        disable: true,
      },
    },
    dropdownClassName: {
      table: {
        disable: true,
      },
    },
    options: {
      control: { type: 'array' },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithValue: Story = {
  args: {
    value: 1,
  },
};

export const Multiple: Story = {
  args: {
    multiple: true,
  },
};

export const MultipleWithValue: Story = {
  args: {
    multiple: true,
    value: [2, 4, 5],
  },
};

export const StartAdornment: Story = {
  args: {
    options: options.map(o => ({ ...o, startAdornment: <UserIcon className='size-5' /> })),
    checkboxes: true,
  },
};

export const EndAdornment: Story = {
  args: {
    options: options.map(o => ({ ...o, endAdornment: `⌘${o.value.toString()}` })),
  },
};

export const Checkboxes: Story = {
  args: {
    multiple: true,
    checkboxes: true,
  },
};

export const WithHandlers: Story = {
  args: {
    placeholder: "Check browser's console",
    onClear: () => {
      console.log('Cleared');
    },
    onDropdownOpen: () => {
      console.log('Opened');
    },
    onDropdownClose: () => {
      console.log('Closed');
    },
    onChange: (option: SelectOptionType | SelectOptionType[]) => {
      console.log('Selected: ' + (Array.isArray(option) ? option.map(o => o.value).join(', ') : option?.value));
    },
  },
};
