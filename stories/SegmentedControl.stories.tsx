import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';
import { DribbleIcon } from '../assets/dribble-icon';
import { GitHubOctocatIcon } from '../assets/github-octocat-icon';
import { YoutubeIcon } from '../assets/youtube-icon';
import { SegmentedControl } from '../components/segmented-control/segmented-control';
import { SegmentedControlItem } from '../components/segmented-control/segmented-control-item';
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
    SegmentedControlItem: SegmentedControlItem as ComponentType<unknown>,
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
        label: 'GitHub',
        value: 'github',
      },
      {
        label: 'Dribble',
        value: 'dribble',
      },
      {
        label: 'Youtube',
        value: 'youtube',
      },
    ],
  },
};

export const TextWithIcon: Story = {
  args: {
    items: [
      {
        label: 'GitHub',
        value: 'github',
        startAdornment: <GitHubOctocatIcon className='size-4' />,
      },
      {
        label: 'Dribble',
        value: 'dribble',
        startAdornment: <DribbleIcon className='size-4' />,
      },
      {
        label: 'Youtube',
        value: 'youtube',
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
        label: <GitHubOctocatIcon className='size-4' />,
        value: 'github',
        title: 'GitHub',
        'aria-label': 'GitHub',
      },
      {
        iconOnly: true,
        label: <DribbleIcon className='size-4' />,
        value: 'dribble',
        title: 'Dribble',
        'aria-label': 'Dribble',
      },
      {
        iconOnly: true,
        label: <YoutubeIcon className='size-4' />,
        value: 'youtube',
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
        label: <GitHubOctocatIcon className='size-4' />,
        'aria-label': 'GitHub',
        value: 'github',
        tooltip: {
          value: 'GitHub',
        },
      },
      {
        iconOnly: true,
        label: <DribbleIcon className='size-4' />,
        'aria-label': 'Dribble',
        value: 'dribble',
        tooltip: {
          value: 'Dribble',
        },
      },
      {
        iconOnly: true,
        label: <YoutubeIcon className='size-4' />,
        'aria-label': 'Youtube',
        value: 'youtube',
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
        label: 'GitHub',
        value: 'github',
      },
      {
        label: 'Dribble',
        value: 'dribble',
      },
      {
        label: 'Youtube',
        value: 'youtube',
        disabled: true,
      },
    ],
  },
};

export const ControlledValue: Story = {
  args: {
    value: 'dribble',
    items: [
      {
        label: 'GitHub',
        value: 'github',
      },
      {
        label: 'Dribble',
        value: 'dribble',
      },
      {
        label: 'Youtube',
        value: 'youtube',
      },
    ],
  },
};

export const HandleChange: Story = {
  args: {
    value: 'youtube',
    onChange: value => {
      alert(`Selected item: ${value}`);
    },
    items: [
      {
        label: 'GitHub',
        value: 'github',
      },
      {
        label: 'Dribble',
        value: 'dribble',
      },
      {
        label: 'Youtube',
        value: 'youtube',
      },
    ],
  },
};
