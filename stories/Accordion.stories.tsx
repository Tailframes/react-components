import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { UserIcon } from '../assets/user-icon';
import { Accordion } from '../components/accordion/accordion';
import { AccordionItem } from '../components/accordion/accordion-item';

const meta = {
  title: 'Components/Accordion',
  parameters: {
    componentSubtitle:
      'The Accordion component neatly organizes content by collapsible sections, providing users with easy navigation through information. Ideal for FAQs, product descriptions, and more, it maximizes space while maintaining accessibility and user-friendly design.',
  },
  component: Accordion,
  subcomponents: { AccordionItem: AccordionItem as ComponentType<unknown> },
  tags: ['autodocs'],
  args: {
    type: 'multiple',
  },
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
    items: items.map(item => ({ ...item, labelStartAdornment: <UserIcon /> })),
  },
};

export const SingleItem: Story = {
  args: {
    type: 'single',
    items,
  },
};
