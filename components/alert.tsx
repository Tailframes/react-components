import { cva } from 'class-variance-authority';
import { type HTMLAttributes, type ReactNode, useId } from 'react';
import { CloseIcon } from '../assets/close-icon';
import { clsxMerge } from '../utils';
import { Avatar, type AvatarProps } from './avatar';
import { Button } from './button';

const alertVariants = cva(
  'inline-flex min-w-[300px] items-start justify-start gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium drop-shadow transition-all duration-500 ease-in-out',
  {
    variants: {
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
  }
);

export interface AlertVariants {
  /** Whether the alert should be full width. */
  fullWidth?: boolean;
}

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, AlertVariants {
  /** An avatar that is shown to the left of the alert. */
  avatar?: AvatarProps;
  /** Additional content to the alert, such as action buttons etc. */
  children?: ReactNode;
  /** A description of the alert. */
  description?: string;
  /** A function that is called when the close button is clicked. */
  onClose?: () => void;
  /** A start adornment that is shown to the left of the alert. */
  startAdornment?: ReactNode;
  /** A title of the alert. */
  title?: string;
}

export function Alert({
  fullWidth = true,
  title,
  description,
  children,
  startAdornment,
  avatar,
  className,
  onClose,
  ...rest
}: AlertProps) {
  const labelId = useId();
  const contentId = useId();

  return (
    <div
      role='alert'
      aria-describedby={description ? contentId : undefined}
      aria-labelledby={title ? labelId : undefined}
      className={clsxMerge(alertVariants({ fullWidth }), className)}
      {...rest}
    >
      {(startAdornment ?? avatar) && (
        <div className='inline-flex items-start justify-start'>
          {!avatar && startAdornment}
          {!startAdornment && avatar && <Avatar {...avatar} />}
        </div>
      )}
      <div className='flex flex-1 flex-col items-start justify-center gap-3 overflow-hidden'>
        {title && (
          <p id={labelId} className='text-sm font-medium text-black'>
            {title}
          </p>
        )}
        {description && (
          <p id={contentId} className='text-xs font-normal leading-none text-slate-600'>
            {description}
          </p>
        )}
        <div>{children}</div>
      </div>
      {onClose && (
        <Button
          variant='text'
          size='small'
          className='h-auto min-w-0 text-slate-600'
          aria-label='Close'
          title='Close'
          iconOnly
        >
          <CloseIcon className='size-4' onClick={onClose} />
        </Button>
      )}
    </div>
  );
}

Alert.displayName = 'Alert';
