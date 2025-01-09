import { clsxMerge } from '../utils';
import type { HTMLAttributes, ReactNode } from 'react';
import { cva } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex rounded-[64px] border text-center font-semibold transition-all duration-300 ease-in-out',
  {
    variants: {
      dotOnly: {
        true: 'rounded-full',
        false: '',
      },
      size: {
        large: 'h-7 px-3 py-1 text-sm',
        medium: 'h-5 px-2 py-0.5 text-xs',
      },
      variant: {
        default: 'border-slate-300 bg-white text-black',
        primary: 'border-blue-700 bg-blue-700 text-white',
        secondary: 'border-blue-300 bg-blue-50 text-blue-600',
        success: 'border-green-600 bg-green-50 text-green-700',
        error: 'border-red-600 bg-red-50 text-red-700',
        warning: 'border-amber-600 bg-amber-50 text-amber-700',
      },
      label: {
        true: 'mr-2',
        false: '',
      },
    },
    compoundVariants: [
      {
        dotOnly: true,
        class: 'size-2 p-0',
      },
      {
        dotOnly: true,
        variant: 'secondary',
        class: 'border border-blue-300 bg-blue-100',
      },
      {
        dotOnly: true,
        variant: 'success',
        class: 'border border-lime-500 bg-lime-500',
      },
      {
        dotOnly: true,
        variant: 'error',
        class: 'border-red-600 bg-red-600',
      },
      {
        dotOnly: true,
        variant: 'warning',
        class: 'border-yellow-400 bg-yellow-400',
      },
    ],
  }
);

const badgeLabelVariants = cva('text-xs font-medium text-black', {
  variants: {
    dotOnly: {
      true: '',
      false: '',
    },
    variant: {
      default: '',
      primary: '',
      secondary: '',
      success: '',
      error: '',
      warning: '',
    },
  },
  compoundVariants: [
    {
      dotOnly: true,
      variant: 'primary',
      class: 'text-blue-700',
    },
    {
      dotOnly: true,
      variant: 'success',
      class: 'text-green-700',
    },
    {
      dotOnly: true,
      variant: 'error',
      class: 'text-red-700',
    },
    {
      dotOnly: true,
      variant: 'warning',
      class: 'text-amber-600',
    },
  ],
});

export interface BadgeVariants {
  /** If true, only a dot will be rendered. */
  dotOnly?: boolean;
  label?: boolean;
  /** The size of the badge. */
  size?: 'medium' | 'large';
  /** The variant of the badge. */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning';
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, Omit<BadgeVariants, 'label'> {
  /** The content of the badge. */
  children?: ReactNode;
  /** The label of the badge, displayed on the right. */
  label?: string;
}

const Root = ({
  variant = 'default',
  size = 'medium',
  dotOnly = false,
  className,
  label,
  children,
  ...rest
}: BadgeProps) => (
  <span className={clsxMerge(badgeVariants({ variant, label: Boolean(label), size, dotOnly }), className)} {...rest}>
    {dotOnly ? null : children}
  </span>
);

export function Badge(props: BadgeProps) {
  if (!props.label) {
    return <Root {...props} />;
  }

  return (
    <div className='inline-flex items-center justify-start'>
      <Root {...props} />
      <span className={clsxMerge(badgeLabelVariants({ variant: props.variant, dotOnly: props.dotOnly }))}>
        {props.label}
      </span>
    </div>
  );
}

Badge.displayName = 'Badge';
