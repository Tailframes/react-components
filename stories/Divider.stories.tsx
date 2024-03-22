import type { Meta, StoryObj } from '@storybook/react';
import { type CSSProperties } from 'react';
import { Divider } from '../components/divider';

const meta = {
  title: 'Components/Divider',
  parameters: {
    componentSubtitle:
      'A Divider is a component within a composition that visually distinguishes content from one another or from other elements in the interface.',
  },
  decorators: [
    (Story, { args }) => {
      const styles: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 600,
        margin: 'auto',
        fontSize: '0.875rem',
        textAlign: 'justify',
      };

      if (args.direction === 'vertical') {
        return (
          <div style={{ ...styles, height: 70 }}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
              quae sunt a te dicta? Refert tamen, quo modo.
            </p>
            <Story />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare,
              quae sunt a te dicta? Refert tamen, quo modo.
            </p>
          </div>
        );
      }

      return (
        <div style={{ ...styles, flexDirection: 'column' }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae
            sunt a te dicta? Refert tamen, quo modo.
          </p>
          <Story />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae
            sunt a te dicta? Refert tamen, quo modo.
          </p>
        </div>
      );
    },
  ],
  component: Divider,
  tags: ['autodocs'],
  args: {
    size: 'thin',
    direction: 'horizontal',
  },
  argTypes: {
    size: {
      control: {
        type: 'inline-radio',
      },
    },
    direction: {
      control: {
        type: 'inline-radio',
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const HorizontalThin: Story = {
  args: {
    size: 'thin',
  },
};
export const HorizontalThick: Story = {
  args: {
    size: 'thick',
  },
};

export const VerticalThin: Story = {
  args: {
    direction: 'vertical',
    size: 'thin',
  },
};

export const VerticalThick: Story = {
  args: {
    direction: 'vertical',
    size: 'thick',
  },
};
