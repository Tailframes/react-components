import type { Meta, StoryObj } from '@storybook/react';
import { type ComponentType } from 'react';
import { StarIcon } from '../assets/star-icon';
import { Select } from '../components/select/select';
import { SelectOption, type SelectOptionProps, type SelectOptionValue } from '../components/select/select-option';

const options: SelectOptionProps[] = [
  {
    label: 'Orange',
    value: 'orange',
  },
  {
    label: 'Red',
    value: 'red',
  },
  {
    label: 'Blue',
    value: 'blue',
  },
  {
    label: 'Green',
    value: 'green',
  },
  {
    label: 'Purple',
    value: 'purple',
  },
];

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
    value: 'purple',
  },
};

export const WithStartAdornment: Story = {
  args: {
    options: options.map(o => ({
      ...o,
      startAdornment: <StarIcon style={{ color: o.value as string }} className='size-5' />,
    })),
  },
};

export const WithEndAdornment: Story = {
  args: {
    options: options.map((o, index) => ({ ...o, endAdornment: `⌘${index + 1}` })),
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
    value: ['red', 'green'],
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
