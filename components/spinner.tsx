import { clsxMerge } from '../utils';
import { cva } from 'class-variance-authority';
import { type HTMLAttributes, type SVGProps } from 'react';

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
});

const spinnerVariants = cva('absolute rounded-full border-blue-100', {
  variants: {
    size: {
      xsmall: 'size-3 border',
      small: 'size-4 border',
      medium: 'size-6 border-2',
      large: 'size-8 border-2',
      xlarge: 'size-10 border-[3px]',
    },
  },
});

const spinSVGProps: Record<NonNullable<SpinnerVariants['size']>, SVGProps<never>> = {
  xsmall: {
    strokeWidth: 2,
    viewBox: '0.5 0 24 24',
  },
  small: {
    strokeWidth: 1.5,
    viewBox: '1 0.25 23 23.5',
  },
  medium: {
    strokeWidth: 2,
    viewBox: '0.5 0 24 24',
  },
  large: {
    strokeWidth: 1.5,
    viewBox: '1 0.25 23 23.5',
  },
  xlarge: {
    strokeWidth: 1.75,
    viewBox: '1 0.125 23 23.75',
  },
};

export interface SpinnerVariants {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement>, SpinnerVariants {
  label?: string;
  labelProps?: HTMLAttributes<HTMLSpanElement>;
}

export function Spinner({ size = 'medium', children, className, label, labelProps = {}, ...rest }: SpinnerProps) {
  const { className: labelClassName, ...labelRest } = labelProps;

  return (
    <div className='inline-flex flex-col items-center justify-center gap-3'>
      <div className={clsxMerge(spinnerContainerVariants({ size }))} {...rest}>
        <div className={clsxMerge(spinnerVariants({ size }), className)}></div>
        <svg
          width='100%'
          height='100%'
          fill='none'
          className='absolute animate-spin stroke-blue-700'
          xmlns='http://www.w3.org/2000/svg'
          {...spinSVGProps[size]}
        >
          <path d='M12.5 23c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11' strokeLinecap='round' />
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
