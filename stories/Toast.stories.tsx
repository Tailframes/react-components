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
      'A toast, or snack, is a brief message that is displayed temporarily on the screen for a few seconds. It can be used to show success, error, warning, or information messages.',
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
    startIcon: IconArgType({ className: 'stroke-inherit' }, [
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
    startIcon: IconKey.CircleExclamationMarkIcon,
  },
};

export const OutlinedSuccessWithIcon: Story = {
  args: {
    color: 'success',
    startIcon: IconKey.CheckboxIcon,
  },
};

export const OutlinedErrorWithIcon: Story = {
  args: {
    color: 'error',
    startIcon: IconKey.CircleCloseIcon,
  },
};

export const OutlinedWarningWithIcon: Story = {
  args: {
    color: 'warning',
    startIcon: IconKey.CircleExclamationMarkIcon,
  },
};

export const FilledDefaultWithIcon: Story = {
  args: {
    variant: 'filled',
    startIcon: IconKey.CircleExclamationMarkIcon,
  },
};

export const FilledSuccessWithIcon: Story = {
  args: {
    variant: 'filled',
    color: 'success',
    startIcon: IconKey.CheckboxIcon,
  },
};

export const FilledErrorWithIcon: Story = {
  args: {
    variant: 'filled',
    color: 'error',
    startIcon: IconKey.CircleCloseIcon,
  },
};

export const FilledWarningWithIcon: Story = {
  args: {
    variant: 'filled',
    color: 'warning',
    startIcon: IconKey.CircleExclamationMarkIcon,
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
