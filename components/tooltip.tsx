import { clsxMerge } from '../utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type HTMLAttributes } from 'react';

const tooltipVariants = cva(
  'pointer-events-none absolute z-50 inline-flex items-center justify-center rounded-lg font-semibold opacity-0 transition-opacity duration-300 ease-in-out ' +
    'group-hover:opacity-100',
  {
    variants: {
      variant: {
        primary: 'bg-slate-900 text-white',
        secondary: 'bg-blue-50 text-blue-700',
      },
      size: {
        large: 'h-10 px-4 text-sm',
        medium: 'h-8 px-3 text-sm',
        small: 'h-6 px-3 text-xs',
      },
      placement: {
        top: 'left-1/2 -translate-x-1/2',
        right: 'left-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2',
        bottom: 'left-1/2 -translate-x-1/2',
        left: 'right-[calc(100%+0.75rem)] top-1/2 -translate-y-1/2',
      },
      showArrow: {
        true: 'after:absolute after:block after:size-0 after:border-8 after:border-transparent',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      placement: 'top',
      showArrow: true,
    },
    compoundVariants: [
      {
        variant: 'primary',
        showArrow: true,
        placement: 'top',
        class: 'after:border-t-slate-900',
      },
      {
        variant: 'secondary',
        showArrow: true,
        placement: 'top',
        class: 'after:border-t-blue-50',
      },
      {
        variant: 'primary',
        showArrow: true,
        placement: 'bottom',
        class: 'after:border-b-slate-900',
      },
      {
        variant: 'secondary',
        showArrow: true,
        placement: 'bottom',
        class: 'after:border-b-blue-50',
      },
      {
        variant: 'primary',
        showArrow: true,
        placement: 'left',
        class: 'after:border-l-slate-900',
      },
      {
        variant: 'secondary',
        showArrow: true,
        placement: 'left',
        class: 'after:border-l-blue-50',
      },
      {
        variant: 'primary',
        showArrow: true,
        placement: 'right',
        class: 'after:border-r-slate-900',
      },
      {
        variant: 'secondary',
        showArrow: true,
        placement: 'right',
        class: 'after:border-r-blue-50',
      },
      {
        placement: 'top',
        showArrow: true,
        class: 'after:-bottom-[0.95rem] after:left-1/2 after:-translate-x-1/2',
      },
      {
        placement: 'bottom',
        showArrow: true,
        class: 'after:-top-[0.95rem] after:left-1/2 after:-translate-x-1/2',
      },
      {
        placement: 'left',
        showArrow: true,
        class: 'after:-right-[0.95rem] after:top-1/2 after:-translate-y-1/2',
      },
      {
        placement: 'right',
        showArrow: true,
        class: 'after:-left-[0.95rem] after:top-1/2 after:-translate-y-1/2',
      },
      {
        size: 'large',
        placement: 'top',
        class: 'top-[-3.25rem]',
      },
      {
        size: 'medium',
        placement: 'top',
        class: 'top-[-2.75rem]',
      },
      {
        size: 'small',
        placement: 'top',
        class: 'top-[-2.25rem]',
      },
      {
        size: 'large',
        placement: 'bottom',
        class: 'bottom-[-3.25rem]',
      },
      {
        size: 'medium',
        placement: 'bottom',
        class: 'bottom-[-2.75rem]',
      },
      {
        size: 'small',
        placement: 'bottom',
        class: 'bottom-[-2.25rem]',
      },
    ],
  }
);

export interface TooltipVariants extends VariantProps<typeof tooltipVariants> {}

interface TooltipProps extends HTMLAttributes<HTMLDivElement>, TooltipVariants {
  value: string;
  width?: number;
  height?: number;
}

export function Tooltip({
  children,
  className,
  placement,
  value,
  width,
  height,
  size,
  variant,
  showArrow,
  style,
  ...rest
}: TooltipProps) {
  return (
    <div className='group relative inline-block whitespace-nowrap'>
      {children}
      <span
        role='tooltip'
        className={clsxMerge(tooltipVariants({ placement, size, variant, showArrow }), className)}
        style={{ width, height, ...style }}
        {...rest}
      >
        {value}
      </span>
    </div>
  );
}

Tooltip.displayName = 'Tooltip';
