import type { Meta, StoryObj } from '@storybook/react';
import { UserIcon } from '../assets/user-icon';
import { Accordion } from '../components/accordion';

const meta = {
  title: 'Components/Accordion',
  parameters: {
    componentSubtitle:
      'The Accordion component neatly organizes content by collapsible sections, providing users with easy navigation through information. Ideal for FAQs, product descriptions, and more, it maximizes space while maintaining accessibility and user-friendly design.',
  },
  component: Accordion,
  tags: ['autodocs'],
  args: {
    type: 'multiple',
  },
  argTypes: {},
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  {
    label: 'First Label',
    content:
      'Feel free to unleash your imagination and let your words flow without inhibition. There are no constraints here; only the boundless potential of your ideas awaits.',
  },
  {
    label: 'Second Label',
    content:
      'Feel free to unleash your imagination and let your words flow without inhibition. There are no constraints here; only the boundless potential of your ideas awaits. ' +
      'Feel free to unleash your imagination and let your words flow without inhibition. There are no constraints here; only the boundless potential of your ideas awaits.',
  },
  {
    label: 'Third Label',
    content:
      'Feel free to unleash your imagination and let your words flow without inhibition. There are no constraints here; only the boundless potential of your ideas awaits. ' +
      'Feel free to unleash your imagination and let your words flow without inhibition. There are no constraints here; only the boundless potential of your ideas awaits. ' +
      'Feel free to unleash your imagination and let your words flow without inhibition. There are no constraints here; only the boundless potential of your ideas awaits.',
  },
];
export const Text: Story = {
  args: {
    items,
  },
};

export const TextWithIcon: Story = {
  args: {
    items: items.map(item => ({ ...item, labelStartIcon: <UserIcon /> })),
  },
};

export const SingleItem: Story = {
  args: {
    type: 'single',
    items,
  },
};
