import { Rate } from '../components/rate';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Rate',
  parameters: {
    componentSubtitle: 'The rating component comprises a star icon, functioning as an assessment element.',
  },
  component: Rate,
  tags: ['autodocs'],
  args: {
    value: 2.5,
  },
  argTypes: {},
} satisfies Meta<typeof Rate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Circle: Story = {};
