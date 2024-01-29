import { clsxMerge } from '../utils';
import { Label } from './label';
import { cva, type VariantProps } from 'class-variance-authority';
import { type InputHTMLAttributes } from 'react';

const checkboxVariants = cva(
  'peer cursor-pointer rounded border-2 border-blue-700 transition-colors duration-300 ease-in-out indeterminate:bg-red-300 ' +
    'hover:bg-blue-50 checked:hover:bg-blue-700 disabled:hover:bg-transparent disabled:checked:hover:bg-slate-300 ' +
    'checked:bg-blue-700 checked:disabled:bg-slate-300 ' +
    'focus:ring-transparent ' +
    'disabled:hover:none disabled:cursor-not-allowed disabled:border-slate-300',
  {
    variants: {
      size: {
        medium: 'size-[18px]',
        small: 'size-4',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

const checkboxContainerVariants = cva('inline-flex items-center justify-start gap-2', {
  variants: {
    size: {
      medium: '',
      small: '',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export interface CheckboxVariants extends VariantProps<typeof checkboxVariants> {}

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type' | 'size'>,
    Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>>,
    CheckboxVariants {
  label?: string;
}

export function Checkbox({ children, className, label, size, ...rest }: CheckboxProps) {
  return (
    <div className={clsxMerge(checkboxContainerVariants({ size }), className)}>
      <input type='checkbox' className={clsxMerge(checkboxVariants({ size }), className)} {...rest} />
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

Checkbox.displayName = 'Checkbox';
