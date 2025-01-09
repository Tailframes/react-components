import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode, useContext } from 'react';
import { CloseIcon } from '../assets/close-icon';
import { Button } from '../components/button';
import { Dialog, DialogContext, DialogProvider } from '../components/dialog';

const DecoratorBody = ({ content }: { content: ReactNode }) => {
  const dialogContext = useContext(DialogContext);

  if (!dialogContext) {
    throw new Error('Component must be wrapped in DialogProvider');
  }

  const handleShowDialog = () => {
    dialogContext.setContent(content);
  };

  return (
    <div style={{ marginTop: 12, marginBottom: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Button onClick={handleShowDialog}>Show Dialog</Button>
    </div>
  );
};

const meta = {
  title: 'Components/Dialog',
  parameters: {
    componentSubtitle:
      "A dialog is an overlaid window that makes underlying windows inactive. Users can't interact with content outside the active dialog, which is usually dimmed and hard to see. Can be used for alerts, confirmations, or form inputs.",
  },
  decorators: [
    (_Story, StoryContext) => (
      <DialogProvider>
        <DecoratorBody content={StoryContext.args.content} />
      </DialogProvider>
    ),
  ],
  component: Dialog,
  tags: ['autodocs'],
  args: {
    visible: false,
    content: null,
  },
  argTypes: {},
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const Content = () => {
  const dialogContext = useContext(DialogContext);

  const handleClose = () => {
    dialogContext?.setVisible(false);
  };

  return (
    <div className='w-40 rounded bg-white p-24'>
      <Button variant='text-default' className='absolute right-4 top-4' size='small' iconOnly>
        <CloseIcon className='size-4 cursor-pointer stroke-inherit hover:opacity-80' onClick={handleClose} />
      </Button>
      <div>This is a Dialog</div>
    </div>
  );
};

export const Default: Story = {
  args: {
    content: <Content />,
  },
};
