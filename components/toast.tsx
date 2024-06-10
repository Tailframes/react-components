import { cva } from 'class-variance-authority';
import { type HTMLAttributes, type ReactNode } from 'react';
import { CloseIcon } from '../assets/close-icon';
import { clsxMerge } from '../utils';

const toastVariants = cva(
  'inline-flex w-full max-w-xs items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium leading-tight shadow',
  {
    variants: {
      variant: {
        outlined: 'text-black',
        filled: '',
      },
      color: {
        default: '[&>:first-child>svg]:stroke-blue-700',
        success: '[&>:first-child>svg]:stroke-green-600',
        error: '[&>:first-child>svg]:stroke-red-600',
        warning: '[&>:first-child>svg]:stroke-orange-500',
      },
      startIcon: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'filled',
        color: 'default',
        class: 'border border-blue-400 bg-blue-50 text-blue-700',
      },
      {
        variant: 'filled',
        color: 'success',
        class: 'border border-green-500 bg-green-50 text-green-600',
      },
      {
        variant: 'filled',
        color: 'error',
        class: 'border border-red-400 bg-red-50 text-red-600',
      },
      {
        variant: 'filled',
        color: 'warning',
        class: 'border border-orange-400 bg-orange-50 text-orange-600',
      },
    ],
  }
);

export interface ToastVariants {
  color?: 'default' | 'success' | 'error' | 'warning';
  variant?: 'outlined' | 'filled';
  startIcon: boolean;
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>, Omit<ToastVariants, 'startIcon'> {
  startIcon?: ReactNode;
}

export function Toast({
  variant = 'outlined',
  color = 'default',
  startIcon,
  children,
  className,
  ...rest
}: ToastProps) {
  return (
    <div className={clsxMerge(toastVariants({ variant, color, startIcon: Boolean(startIcon) }), className)} {...rest}>
      {startIcon && <div className='inline-flex size-5 items-center justify-start'>{startIcon}</div>}
      <div className='inline-flex flex-1 items-center justify-start overflow-hidden'>{children}</div>
      <CloseIcon className='size-4 cursor-pointer' />
    </div>
  );
}

Toast.displayName = 'Toast';
