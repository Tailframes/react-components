import { clsxMerge } from '../utils';
import { type HTMLAttributes, type ReactNode } from 'react';
import { cva } from 'class-variance-authority';

const tagVariants = cva(
  'inline-flex h-6 max-w-max cursor-default items-center justify-start gap-1 rounded-[64px] px-2 py-1 text-center text-xs font-semibold leading-relaxed',
  {
    variants: {
      variant: {
        primary: 'bg-blue-700 text-white [&>div>svg]:stroke-white',
        secondary: 'bg-blue-50 text-blue-700 [&>div>svg]:stroke-blue-700',
        outlined: 'border border-blue-700 text-blue-700 [&>div>svg]:stroke-blue-700',
        success: 'border border-green-600 bg-green-50 text-green-700 [&>div>svg]:stroke-green-700',
        error: 'border border-red-600 bg-red-50 text-red-700 [&>div>svg]:stroke-red-700',
        warning: 'border border-amber-600 bg-amber-50 text-amber-700 [&>div>svg]:stroke-amber-600',
      },
      startAdornment: {
        true: '',
        false: '',
      },
      endAdornment: {
        true: '',
        false: '',
      },
    },
  }
);

export interface TagVariants {
  /** The variant of the tag. */
  variant?: 'primary' | 'secondary' | 'outlined' | 'success' | 'error' | 'warning';
  startAdornment: boolean;
  endAdornment: boolean;
}

export interface TagProps
  extends HTMLAttributes<HTMLSpanElement>,
    Omit<TagVariants, 'startAdornment' | 'endAdornment'> {
  /** Content of the tag. */
  children: ReactNode;
  /** Start adornment of the tag e.g. an icon. */
  startAdornment?: ReactNode;
  /** End adornment of the tag e.g. an icon. */
  endAdornment?: ReactNode;
}

export function Tag({ variant = 'primary', className, startAdornment, endAdornment, children, ...rest }: TagProps) {
  return (
    <div
      className={clsxMerge(
        tagVariants({ variant, startAdornment: Boolean(startAdornment), endAdornment: Boolean(endAdornment) }),
        className
      )}
    >
      {startAdornment && (
        <div className='inline-flex size-[18px] items-center justify-start overflow-hidden'>{startAdornment}</div>
      )}
      <span {...rest}>{children}</span>
      {endAdornment && (
        <div className='inline-flex size-[18px] items-center justify-end overflow-hidden'>{endAdornment}</div>
      )}
    </div>
  );
}

Tag.displayName = 'Tag';
