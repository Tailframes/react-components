import { clsxMerge } from '../utils';
import { type ForwardedRef, forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Label } from './label';

const inputVariants = cva(
  'w-full rounded-lg border-slate-300 px-3 text-sm font-medium placeholder-slate-400 outline-none transition-all duration-300 ease-out ' +
    'focus:border-blue-600 ' +
    'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:placeholder-slate-400',
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        large: 'py-2.5',
        medium: 'py-2',
      },
      error: {
        true: 'border-2 border-red-500 text-red-500 focus:border-red-500 focus:text-black focus:outline-none focus:ring-0 focus:ring-offset-0',
        false: '',
      },
      startIcon: {
        true: 'pl-10',
        false: '',
      },
      endIcon: {
        true: 'pr-10',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
);

const inputContainerVariants = cva(
  'inline-flex w-full max-w-sm flex-col items-start gap-2 stroke-black transition-colors duration-300 ease-out focus-within:stroke-blue-700',
  {
    variants: {
      error: {
        true: 'stroke-red-500 focus-within:stroke-red-500',
        false: '',
      },
      disabled: {
        true: 'stroke-slate-400 text-slate-400',
        false: '',
      },
    },
    defaultVariants: {
      error: false,
      disabled: false,
    },
  }
);

const inputHelperTextVariants = cva('max-w-full text-xs font-medium leading-none text-slate-400', {
  variants: {
    error: {
      true: 'text-red-500',
      false: '',
    },
  },
  defaultVariants: {
    error: false,
  },
});

export interface InputVariants extends VariantProps<typeof inputVariants> {}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'id'>,
    Required<Pick<InputHTMLAttributes<HTMLInputElement>, 'id'>>,
    Omit<InputVariants, 'disabled' | 'startIcon' | 'endIcon'> {
  containerClassName?: string;
  label?: string;
  helperText?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, containerClassName, variant, size, label, startIcon, endIcon, helperText, error, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div
        className={clsxMerge(inputContainerVariants({ error, disabled: Boolean(rest?.disabled) }), containerClassName)}
      >
        {label && (
          <Label htmlFor={rest.id} size='small'>
            {label}
          </Label>
        )}
        <div className='relative w-full'>
          {startIcon && (
            <div className='pointer-events-none absolute left-6 top-1/2 w-5 -translate-x-1/2 -translate-y-1/2'>
              {startIcon}
            </div>
          )}
          <input
            ref={ref}
            className={clsxMerge(
              inputVariants({ error, variant, size, startIcon: Boolean(startIcon), endIcon: Boolean(endIcon) }),
              className
            )}
            {...rest}
          />
          {endIcon && <div className='absolute right-0 top-1/2 w-5 -translate-x-1/2 -translate-y-1/2'>{endIcon}</div>}
        </div>
        {helperText && <p className={clsxMerge(inputHelperTextVariants({ error }))}>{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
