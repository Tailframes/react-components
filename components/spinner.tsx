import { clsxMerge } from '../utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLAttributes, type ReactNode } from 'react';

const spinnerContainerVariants = cva('relative', {
  variants: {
    size: {
      xsmall: 'size-3',
      small: 'size-4',
      medium: 'size-6',
      large: 'size-8',
      xlarge: 'size-10',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

const spinnerVariants = cva('absolute rounded-full border-2 border-blue-100', {
  variants: {
    size: {
      xsmall: 'size-3',
      small: 'size-4',
      medium: 'size-6',
      large: 'size-8',
      xlarge: 'size-10',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

export interface SpinnerVariants extends VariantProps<typeof spinnerVariants> {}

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement>, SpinnerVariants {
  label?: ReactNode;
  labelProps?: HTMLAttributes<HTMLSpanElement>;
}

export function Spinner({ children, className, label, size, labelProps = {}, ...rest }: SpinnerProps) {
  const { className: labelClassName, ...labelRest } = labelProps;

  return (
    <div className='inline-flex flex-col items-center justify-center gap-3'>
      <div className={clsxMerge(spinnerContainerVariants({ size }))} {...rest}>
        <div className={clsxMerge(spinnerVariants({ size }), className)}></div>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 25 24'
          fill='none'
          className='absolute animate-spin stroke-blue-700'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M12.5 23C18.5751 23 23.5 18.0751 23.5 12C23.5 5.92487 18.5751 1 12.5 1C6.42487 1 1.5 5.92487 1.5 12'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      </div>
      {label && (
        <span className={clsxMerge('text-xs font-semibold leading-tight text-blue-700', labelClassName)} {...labelRest}>
          {label}
        </span>
      )}
      {!label && <span className='sr-only'>Loading...</span>}
    </div>
  );
}

Spinner.displayName = 'Spinner';
