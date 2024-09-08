import type { Meta, StoryObj } from '@storybook/react';
import { useContext, useEffect } from 'react';
import { IconArgType, IconKey } from '../.storybook/arg-types';
import { Button } from '../components/button';
import { Toast, ToastContext, type ToastProps, ToastProvider } from '../components/toast';

const DecoratorBody = ({ props }: { props: ToastProps }) => {
  const toastContext = useContext(ToastContext);

  useEffect(() => {
    if (toastContext) {
      toastContext.setToast(props);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  if (!toastContext) {
    throw new Error('Component must be wrapped in ToastProvider');
  }

  const handleShowToast = () => {
    toastContext.setToast(props);
  };

  return (
    <div style={{ marginTop: 12, marginBottom: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button onClick={handleShowToast}>Show Toast</Button>
    </div>
  );
};

const meta = {
  title: 'Components/Toast',
  parameters: {
    componentSubtitle:
      'A Toast, also known as a snack, is a brief, temporary message that appears on the screen for a few seconds to convey success, error, warning, or informational messages. This small yet impactful feature plays a crucial role in providing real-time feedback to users, ensuring that they are promptly informed of important actions or events.',
  },
  decorators: [
    (_Story, StoryContext) => (
      <ToastProvider>
        <DecoratorBody props={{ ...StoryContext.args, visible: true }} />
      </ToastProvider>
    ),
  ],
  component: Toast,
  tags: ['autodocs'],
  args: {
    variant: 'outlined',
    color: 'default',
    children: 'This is a Toast',
    placement: 'bottom-right',
    autoClose: false,
    autoCloseTimeout: 3000,
  },
  argTypes: {
    autoClose: {
      defaultValue: {
        summary: true,
      },
    },
    autoCloseTimeout: {
      defaultValue: {
        summary: 3000,
      },
    },
    startAdornment: IconArgType({ className: 'stroke-inherit' }, [
      IconKey.CircleExclamationMarkIcon,
      IconKey.CircleCloseIcon,
      IconKey.CheckboxIcon,
    ]),
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OutlinedDefaultWithIcon: Story = {
  args: {
    startAdornment: IconKey.CircleExclamationMarkIcon,
  },
};

export const OutlinedSuccessWithIcon: Story = {
  args: {
    color: 'success',
    startAdornment: IconKey.CheckboxIcon,
  },
};

export const OutlinedErrorWithIcon: Story = {
  args: {
    color: 'error',
    startAdornment: IconKey.CircleCloseIcon,
  },
};

export const OutlinedWarningWithIcon: Story = {
  args: {
    color: 'warning',
    startAdornment: IconKey.CircleExclamationMarkIcon,
  },
};

export const FilledDefaultWithIcon: Story = {
  args: {
    variant: 'filled',
    startAdornment: IconKey.CircleExclamationMarkIcon,
  },
};

export const FilledSuccessWithIcon: Story = {
  args: {
    variant: 'filled',
    color: 'success',
    startAdornment: IconKey.CheckboxIcon,
  },
};

export const FilledErrorWithIcon: Story = {
  args: {
    variant: 'filled',
    color: 'error',
    startAdornment: IconKey.CircleCloseIcon,
  },
};

export const FilledWarningWithIcon: Story = {
  args: {
    variant: 'filled',
    color: 'warning',
    startAdornment: IconKey.CircleExclamationMarkIcon,
  },
};

export const OutlinedDefaultTextOnly: Story = {
  args: {},
};

export const FilledDefaultTextOnly: Story = {
  args: {
    variant: 'filled',
  },
};
