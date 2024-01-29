import { clsxMerge } from '../utils';
import { cva, type VariantProps } from 'class-variance-authority';
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
  defaultVariants: {
    size: 'thin',
    direction: 'horizontal',
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

export interface DividerVariants extends VariantProps<typeof dividerVariants> {}

export interface DividerProps extends HTMLAttributes<HTMLDivElement>, DividerVariants {}

export function Divider({ children, className, size, direction, ...rest }: DividerProps) {
  return (
    <div className={clsxMerge(dividerVariants({ size, direction }), className)} {...rest}>
      {children}
    </div>
  );
}

Divider.displayName = 'Divider';
