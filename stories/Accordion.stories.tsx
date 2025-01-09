import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { CircleArrowRightIcon } from '../assets/circle-arrow-right-icon';
import { Accordion, type AccordionProps } from '../components/accordion/accordion';
import { AccordionItem } from '../components/accordion/accordion-item';

const meta = {
  title: 'Components/Accordion',
  parameters: {
    componentSubtitle:
      'The Accordion component offers a sleek and efficient way to present information through collapsible sections, making it perfect for FAQs, product descriptions, and other content-heavy pages. Designed with a focus on maximizing space, it enhances user experience by allowing visitors to easily navigate through information without overwhelming them.',
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

const items: AccordionProps['items'] = [
  {
    label: 'What is Tailframes?',
    contentClassName: 'text-justify',
    content: (
      <p>
        Tailframes is a comprehensive library of pre-built UI components designed with <strong>React</strong> and{' '}
        <strong>Tailwind CSS</strong>. Our goal is to help developers quickly and efficiently build beautiful,
        responsive websites by providing a wide range of customizable <strong>Tailwind CSS components</strong> that
        adhere to modern <strong>UI/UX design principles</strong>. Whether you&apos;re building a new project from
        scratch or enhancing an existing one, Tailframes offers the perfect blend of <strong>React components</strong>{' '}
        to streamline your development process.
      </p>
    ),
  },
  {
    label: 'How do I integrate Tailframes components into my project?',
    content: (
      <>
        <p>
          Integrating <strong>Tailframes</strong> components into your project is straightforward. First, ensure your
          project is set up with <strong>React</strong> and <strong>Tailwind CSS</strong>. Then, browse through our
          extensive <strong>Tailwind CSS component library</strong>, select the components you need, and simply copy the
          provided JSX code. Paste this code into your React components, and customize the styles using Tailwind’s
          utility classes to match your project’s design specifications.
        </p>
        <br />
        <p>
          For more detailed instructions, you can refer to our{' '}
          <a
            href='https://tailframes.com/getting-started'
            className='text-blue-500 hover:underline'
            target='_blank'
            rel='noreferrer'
          >
            documentation
          </a>{' '}
          and <strong>Tailwind CSS code examples</strong>, which includes step-by-step guides and examples on using{' '}
          <strong>React with Tailwind CSS</strong> effectively.
        </p>
      </>
    ),
  },
  {
    label: 'What are the benefits of using Tailframes?',
    content: (
      <>
        <p className='mb-1'>
          <strong>Tailframes</strong> offers numerous benefits for developers looking to accelerate their{' '}
          <strong>web development</strong> process using <strong>React</strong> and <strong>Tailwind CSS</strong>
        </p>
        <ul className='ml-4 list-inside list-disc space-y-0.5'>
          <li>
            <strong>Speed:</strong> Quickly assemble web pages with pre-built <strong>UI components</strong>, saving
            significant time on design and implementation.
          </li>
          <li>
            <strong>Customization:</strong> Tailframes components are built with <strong>Tailwind CSS</strong>, allowing
            easy customization through Tailwind’s utility-first approach.
          </li>
          <li>
            <strong>Responsive Design:</strong> All components are responsive by default, ensuring your{' '}
            <strong>React applications</strong> look great on any device.
          </li>
          <li>
            <strong>Consistency:</strong> Maintain a consistent design language across your project with components that
            adhere to modern <strong>UI/UX standards</strong>.
          </li>
        </ul>
        <br />
        <p>
          Additionally, Tailframes is constantly updated with new <strong>React components</strong> and features, so you
          can stay ahead of the curve with the latest UI trends in the <strong>React and Tailwind CSS ecosystem</strong>
          .
        </p>
      </>
    ),
  },
];

export const Text: Story = {
  args: {
    items,
  },
};

export const TextWithStartAdornment: Story = {
  args: {
    items: items.map(item => ({ ...item, labelStartAdornment: <CircleArrowRightIcon /> })),
  },
};

export const SingleItem: Story = {
  args: {
    type: 'single',
    items,
  },
};
