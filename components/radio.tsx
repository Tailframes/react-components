import { clsxMerge } from '../utils';
import { Label } from './label';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { type InputHTMLAttributes } from 'react';

const radioVariants = cva(
  'peer cursor-pointer border-0 ring-2 ring-slate-300 ring-offset-2 transition-colors duration-300 ease-in-out ' +
    'hover:ring-blue-700 ' +
    'checked:bg-none checked:ring-blue-700 checked:ring-offset-2 checked:disabled:bg-slate-400 checked:disabled:ring-offset-2 ' +
    'focus:ring-offset-2 ' +
    'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-50 disabled:ring-slate-200 disabled:ring-offset-0',
  {
    variants: {
      size: {
        medium:
          'h-[10px] w-[10px] disabled:h-[14px] disabled:w-[14px] disabled:checked:h-[10px] disabled:checked:w-[10px]',
        small: 'h-2 w-2 disabled:h-3 disabled:w-3 disabled:checked:h-3 disabled:checked:w-3',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

const radioContainerVariants = cva('inline-flex items-center justify-start', {
  variants: {
    size: {
      medium: 'gap-3',
      small: 'gap-2',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export interface RadioVariants extends VariantProps<typeof radioVariants> {}

interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type' | 'size'>,
    Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>>,
    RadioVariants {
  label?: string;
}

export function Radio({ children, className, label, size, ...rest }: RadioProps) {
  return (
    <div className={clsxMerge(radioContainerVariants({ size }), className)}>
      <input type='radio' className={clsxMerge(radioVariants({ size }), className)} {...rest} />
      {label && (
        <Label
          htmlFor={rest.id}
          size='small'
          className='whitespace-nowrap hover:cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:text-slate-400'
        >
          {label}
        </Label>
      )}
    </div>
  );
}

Radio.displayName = 'Radio';
