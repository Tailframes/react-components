import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '../components/radio';
import { RadioGroup } from '../components/radio-group';

const meta = {
  title: 'Components/RadioGroup',
  parameters: {
    componentSubtitle:
      'A radio group is a set of radio buttons where only one can be selected at a time. It may start with all buttons unchecked, requiring user selection before proceeding in the workflow.',
  },
  decorators: [
    Story => (
      <div className='flex flex-col gap-4'>
        <h4 id='group-label'>Select an option</h4>
        <Story />
      </div>
    ),
  ],
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    'aria-labelledby': 'group-label',
    direction: 'horizontal',
    space: 'medium',
  },
  argTypes: {
    'aria-labelledby': {
      table: {
        disable: true,
      },
    },
    direction: {
      control: {
        type: 'inline-radio',
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Radio name='radio' label='Option 1' />
        <Radio name='radio' label='Option 2' />
        <Radio name='radio' label='Option 3' />
      </>
    ),
  },
};
