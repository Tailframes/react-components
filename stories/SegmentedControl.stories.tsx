import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { DribbleIcon } from '../assets/dribble-icon';
import { GitHubOctocatIcon } from '../assets/github-octocat-icon';
import { YoutubeIcon } from '../assets/youtube-icon';
import { Button } from '../components/button';
import { SegmentedControl } from '../components/segmented-control';
import { Tooltip } from '../components/tooltip';

const meta = {
  title: 'Components/Segmented Control',
  parameters: {
    componentSubtitle:
      "The Segmented Control is a user-friendly interface element allowing easy selection between multiple options. It's commonly used in apps and websites for switching views or modes efficiently. This control enhances user experience by offering clear choices within a compact space, ideal for settings, filtering, or tabbed navigation.",
  },
  decorators: [
    Story => (
      <div className='mx-4 my-6'>
        <Story />
      </div>
    ),
  ],
  component: SegmentedControl,
  subcomponents: {
    Button: Button as ComponentType<unknown>,
    Tooltip: Tooltip as ComponentType<unknown>,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentedControl>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    items: [
      {
        children: 'GitHub',
      },
      {
        children: 'Dribble',
      },
      {
        children: 'Youtube',
      },
    ],
  },
};

export const TextWithIcon: Story = {
  args: {
    items: [
      {
        children: 'GitHub',
        startAdornment: <GitHubOctocatIcon className='size-4' />,
      },
      {
        children: 'Dribble',
        startAdornment: <DribbleIcon className='size-4' />,
      },
      {
        children: 'Youtube',
        startAdornment: <YoutubeIcon className='size-4' />,
      },
    ],
  },
};

export const Icon: Story = {
  args: {
    items: [
      {
        iconOnly: true,
        children: <GitHubOctocatIcon className='size-4' />,
        title: 'GitHub',
        'aria-label': 'GitHub',
      },
      {
        iconOnly: true,
        children: <DribbleIcon className='size-4' />,
        title: 'Dribble',
        'aria-label': 'Dribble',
      },
      {
        iconOnly: true,
        children: <YoutubeIcon className='size-4' />,
        title: 'Youtube',
        'aria-label': 'Youtube',
      },
    ],
  },
};

export const IconWithTooltip: Story = {
  args: {
    items: [
      {
        iconOnly: true,
        children: <GitHubOctocatIcon className='size-4' />,
        'aria-label': 'GitHub',
        tooltip: {
          value: 'GitHub',
        },
      },
      {
        iconOnly: true,
        children: <DribbleIcon className='size-4' />,
        'aria-label': 'Dribble',
        tooltip: {
          value: 'Dribble',
        },
      },
      {
        iconOnly: true,
        children: <YoutubeIcon className='size-4' />,
        'aria-label': 'Youtube',
        tooltip: {
          value: 'Youtube',
        },
      },
    ],
  },
};

export const Disabled: Story = {
  args: {
    items: [
      {
        children: 'GitHub',
      },
      {
        children: 'Dribble',
      },
      {
        children: 'Youtube',
        disabled: true,
      },
    ],
  },
};

export const ControlledValue: Story = {
  args: {
    value: 'Dribble',
    onChange: value => {
      alert(`Selected item: ${value}`);
    },
    items: [
      {
        children: 'GitHub',
        value: 'GitHub',
      },
      {
        children: 'Dribble',
        value: 'Dribble',
      },
      {
        children: 'Youtube',
        value: 'Youtube',
      },
    ],
  },
};
