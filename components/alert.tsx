import { cva } from 'class-variance-authority';
import { type HTMLAttributes, type ReactNode, useId } from 'react';
import { CloseIcon } from '../assets/close-icon';
import { clsxMerge } from '../utils';
import { Avatar, type AvatarProps } from './avatar';
import { Button } from './button';

const alertVariants = cva(
  'inline-flex min-w-[300px] items-start justify-start gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium leading-tight drop-shadow transition-all duration-500 ease-in-out',
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
  fullWidth?: boolean;
}

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, AlertVariants {
  avatar?: AvatarProps;
  children?: ReactNode;
  description?: string;
  onClose?: () => void;
  startIcon?: ReactNode;
  title?: string;
}

export function Alert({
  fullWidth = true,
  title,
  description,
  children,
  startIcon,
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
      {(startIcon ?? avatar) && (
        <div className='inline-flex items-start justify-start'>
          {!avatar && startIcon}
          {!startIcon && avatar && <Avatar {...avatar} />}
        </div>
      )}
      <div className='flex flex-1 flex-col items-start justify-center gap-3 overflow-hidden'>
        {title && (
          <p id={labelId} className='text-sm font-medium leading-tight text-black'>
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
