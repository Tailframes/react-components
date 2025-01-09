import { Rate } from '../components/rate';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/Rate',
  parameters: {
    componentSubtitle:
      'The rating component, often represented by a star icon, serves as a critical assessment tool in user interfaces, allowing users to provide feedback or evaluations. This feature is especially valuable in applications where user ratings are integral, such as e-commerce platforms or review systems.',
  },
  component: Rate,
  tags: ['autodocs'],
  args: {
    value: 2.5,
    stars: 5,
  },
  argTypes: {
    stars: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4, 5],
      },
    },
  },
} satisfies Meta<typeof Rate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
