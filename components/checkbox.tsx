import { clsxMerge } from '../utils';
import { Label } from './label';
import { cva } from 'class-variance-authority';
import { forwardRef, type InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';

const checkboxVariants = cva(
  'peer cursor-pointer rounded border-2 border-slate-400 transition-colors duration-300 ease-in-out ' +
    'checked:bg-blue-700 checked:hover:bg-blue-700 checked:disabled:border-slate-300 checked:disabled:bg-slate-300 checked:disabled:hover:bg-slate-300 ' +
    'disabled:hover:none disabled:cursor-not-allowed disabled:border-slate-200 disabled:indeterminate:border-slate-300 disabled:indeterminate:bg-slate-300 disabled:hover:bg-transparent ' +
    'hover:border-blue-700 hover:bg-blue-50 focus:ring-transparent ' +
    'indeterminate:bg-blue-700 indeterminate:disabled:hover:bg-slate-300',
  {
    variants: {
      size: {
        medium: 'size-4',
        small: 'size-[14px]',
      },
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
});

export interface CheckboxVariants {
  size?: 'small' | 'medium';
}

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'type' | 'size'>,
    Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name'>>,
    CheckboxVariants {
  label?: string;
  indeterminate?: boolean;
  disabled?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ size = 'medium', children, className, label, indeterminate, ...rest }: CheckboxProps, ref) => {
    const innerRef = useRef<HTMLInputElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    useImperativeHandle(ref, () => innerRef.current!, [innerRef]);

    useEffect(() => {
      if (typeof indeterminate === 'boolean' && innerRef?.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [innerRef, indeterminate]);

    return (
      <div className={clsxMerge(checkboxContainerVariants({ size }), className)}>
        <input ref={innerRef} type='checkbox' className={clsxMerge(checkboxVariants({ size }), className)} {...rest} />
        {label && (
          <Label
            htmlFor={rest.id}
            size='small'
            className='whitespace-nowrap peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 hover:cursor-pointer'
          >
            {label}
          </Label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
