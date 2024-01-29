import { clsxMerge } from '../utils';
import { type LabelHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const labelVariants = cva('font-medium leading-none peer-disabled:opacity-70', {
  variants: {
    size: {
      large: 'text-lg',
      medium: 'text-sm',
      small: 'text-xs',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export interface LabelVariants extends VariantProps<typeof labelVariants> {}

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>, LabelVariants {}

export function Label({ className, size, htmlFor, ...rest }: LabelProps) {
  return <label className={clsxMerge(labelVariants({ size }), className)} htmlFor={htmlFor} {...rest} />;
}

Label.displayName = 'Label';
