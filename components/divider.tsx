import { clsxMerge } from '../utils';
import { cva } from 'class-variance-authority';
import { type HTMLAttributes } from 'react';

const dividerVariants = cva('bg-slate-300', {
  variants: {
    size: {
      thin: '',
      thick: '',
    },
    direction: {
      horizontal: 'my-4 w-full',
      vertical: 'mx-4 my-1 max-h-screen min-h-full',
    },
  },
  compoundVariants: [
    {
      direction: 'horizontal',
      size: 'thin',
      class: 'h-[1px]',
    },
    {
      direction: 'horizontal',
      size: 'thick',
      class: 'h-[2px]',
    },
    {
      direction: 'vertical',
      size: 'thin',
      class: 'border-l',
    },
    {
      direction: 'vertical',
      size: 'thick',
      class: 'border-l-2',
    },
  ],
});

export interface DividerVariants {
  size?: 'thin' | 'thick';
  direction?: 'horizontal' | 'vertical';
}

export interface DividerProps extends HTMLAttributes<HTMLDivElement>, DividerVariants {}

export function Divider({ size = 'thin', direction = 'horizontal', children, className, ...rest }: DividerProps) {
  return (
    <div role='separator' className={clsxMerge(dividerVariants({ size, direction }), className)} {...rest}>
      {children}
    </div>
  );
}

Divider.displayName = 'Divider';
