import { clsxMerge, joinClassNames } from '../utils';
import { cva } from 'class-variance-authority';
import { type HTMLAttributes, useId } from 'react';

const tooltipVariants = cva(
  joinClassNames(
    'pointer-events-none absolute z-50 inline-flex items-center justify-center rounded-md px-3 py-1 font-semibold opacity-0 transition-opacity duration-300 ease-in-out',
    'group-hover:opacity-100'
  ),
  {
    variants: {
      variant: {
        primary: 'bg-slate-900 text-white',
        secondary: 'bg-blue-50 text-blue-700',
      },
      size: {
        medium: 'min-h-7 text-sm',
        small: 'min-h-6 text-xs',
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
        class: 'after:bottom-[-0.95rem] after:left-1/2 after:-translate-x-1/2',
      },
      {
        placement: 'bottom',
        showArrow: true,
        class: 'after:left-1/2 after:top-[-0.95rem] after:-translate-x-1/2',
      },
      {
        placement: 'left',
        showArrow: true,
        class: 'after:right-[-0.95rem] after:top-1/2 after:-translate-y-1/2',
      },
      {
        placement: 'right',
        showArrow: true,
        class: 'after:left-[-0.95rem] after:top-1/2 after:-translate-y-1/2',
      },
      {
        size: 'medium',
        placement: 'top',
        class: '-top-10',
      },
      {
        size: 'small',
        placement: 'top',
        class: '-top-9',
      },
      {
        size: 'medium',
        placement: 'bottom',
        class: '-bottom-10',
      },
      {
        size: 'small',
        placement: 'bottom',
        class: '-bottom-9',
      },
    ],
  }
);

export interface TooltipVariants {
  /** The variant of the tooltip. */
  variant?: 'primary' | 'secondary';
  /** The size of the tooltip. */
  size?: 'medium' | 'small';
  /** The placement of the tooltip. */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /** Whether to show the arrow of the tooltip. */
  showArrow?: boolean;
}

export interface TooltipProps extends HTMLAttributes<HTMLDivElement>, TooltipVariants {
  /** The value of the tooltip. */
  value: string;
  /** Custom container className of the tooltip. */
  containerClassName?: string;
}

export function Tooltip({
  placement = 'top',
  size = 'medium',
  variant = 'primary',
  showArrow = true,
  children,
  className,
  containerClassName,
  value,
  ...rest
}: TooltipProps) {
  const id = useId();

  return (
    <div className={clsxMerge('group relative inline-block whitespace-nowrap', containerClassName)}>
      <div aria-describedby={id}>{children}</div>
      <span
        id={id}
        role='tooltip'
        className={clsxMerge(tooltipVariants({ placement, size, variant, showArrow }), className)}
        {...rest}
      >
        {value}
      </span>
    </div>
  );
}

Tooltip.displayName = 'Tooltip';
