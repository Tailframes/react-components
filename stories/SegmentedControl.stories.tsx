import type { Meta, StoryObj } from '@storybook/react';
import { DribbleIcon } from '../assets/dribble-icon';
import { GitHubOctocatIcon } from '../assets/github-octocat-icon';
import { YoutubeIcon } from '../assets/youtube-icon';
import { SegmentedControl } from '../components/segmented-control';

const meta = {
  title: 'Components/Segmented Control',
  parameters: {
    componentSubtitle:
      "The Segmented Control is a user-friendly interface element allowing easy selection between multiple options. It's commonly used in apps and websites for switching views or modes efficiently. This control enhances user experience by offering clear choices within a compact space, ideal for settings, filtering, or tabbed navigation.",
  },
  component: SegmentedControl,
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
        startIcon: <GitHubOctocatIcon className='size-4' />,
      },
      {
        children: 'Dribble',
        startIcon: <DribbleIcon className='size-4' />,
      },
      {
        children: 'Youtube',
        startIcon: <YoutubeIcon className='size-4' />,
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
      },
      {
        iconOnly: true,
        children: <DribbleIcon className='size-4' />,
      },
      {
        iconOnly: true,
        children: <YoutubeIcon className='size-4' />,
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
        tooltip: {
          value: 'GitHub',
        },
      },
      {
        iconOnly: true,
        children: <DribbleIcon className='size-4' />,
        tooltip: {
          value: 'Dribble',
        },
      },
      {
        iconOnly: true,
        children: <YoutubeIcon className='size-4' />,
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
