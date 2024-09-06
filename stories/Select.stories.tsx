import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentType } from 'react';
import { UserIcon } from '../assets/user-icon';
import { Select } from '../components/select/select';
import { SelectOption, type SelectOptionValue } from '../components/select/select-option';

const options = Array.from({ length: 5 }, (_, i) => ({
  label: `Label ${i + 1}`,
  value: i + 1,
  disabled: i % 3 === 0,
}));

const meta = {
  title: 'Components/Select',
  parameters: {
    componentSubtitle:
      'The Select component, also known as a dropdown, is a crucial form control that enables users to choose one or more options from a predefined list. This versatile and user-friendly element is essential in various applications, from simple forms to complex interfaces, where streamlined selection processes are key.',
  },
  component: Select,
  subcomponents: { SelectOption: SelectOption as ComponentType<unknown> },
  decorators: [
    Story => (
      <div className='max-w-[240px]'>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  args: {
    checkboxes: false,
    clearable: true,
    disabled: false,
    error: false,
    label: 'Label',
    multiple: false,
    options,
    placeholder: 'Choose an option',
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
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const ValueSelected: Story = {
  args: {
    value: 1,
  },
};

export const WithStartAdornment: Story = {
  args: {
    options: options.map(o => ({ ...o, startAdornment: <UserIcon className='size-5' /> })),
  },
};

export const WithEndAdornment: Story = {
  args: {
    options: options.map(o => ({ ...o, endAdornment: `⌘${o.value.toString()}` })),
  },
};

export const MultipleValues: Story = {
  args: {
    multiple: true,
    placeholder: 'Choose one or more',
  },
};

export const MultipleValuesSelected: Story = {
  args: {
    multiple: true,
    placeholder: 'Choose one or more',
    value: [2, 4, 5],
  },
};

export const MultipleValuesWithCheckboxes: Story = {
  args: {
    multiple: true,
    placeholder: 'Choose one or more',
    checkboxes: true,
  },
};

export const WithEventsHandlers: Story = {
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
    onChange: (option: SelectOptionValue | SelectOptionValue[]) => {
      console.log('Selected: ' + (Array.isArray(option) ? option.map(o => o).join(', ') : option));
    },
  },
};
