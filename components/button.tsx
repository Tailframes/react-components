import { clsxMerge } from '../utils';
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-blue-700 stroke-white px-6 text-white hover:bg-blue-950',
        secondary: 'bg-blue-50 stroke-blue-700 px-6 text-blue-700 hover:bg-blue-100',
        outlined: 'border border-blue-700 bg-transparent stroke-blue-700 px-6 text-blue-700 hover:bg-blue-50',
        text: 'stroke-blue-700 px-2 text-blue-600',
        'text-default': 'stroke-black px-2 text-black',
      },
      size: {
        large: 'h-[42px] min-w-[42px] gap-2',
        medium: 'h-[38px] min-w-[38px] gap-2',
        small: 'h-8 min-w-[32px] gap-1.5 text-xs',
        xsmall: 'h-6 min-w-[24px] gap-1.5 text-xs',
      },
      disabled: {
        true: '',
        false: '',
      },
      href: {
        true: 'cursor-pointer',
        false: '',
      },
      iconOnly: {
        true: 'p-0',
        false: '',
      },
      startIcon: {
        true: '',
        false: '',
      },
      endIcon: {
        true: '',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      iconOnly: false,
    },
    compoundVariants: [
      {
        variant: ['primary', 'secondary'],
        class: 'disabled:bg-slate-100 disabled:stroke-slate-400 disabled:text-slate-400 disabled:hover:bg-slate-100',
      },
      {
        variant: ['outlined'],
        class:
          'disabled:border-slate-100 disabled:bg-white disabled:stroke-slate-400 disabled:text-slate-400 disabled:hover:bg-white',
      },
      {
        variant: ['primary', 'secondary', 'outlined'],
        iconOnly: false,
        startIcon: true,
        class: 'px-4',
      },
      {
        variant: ['primary', 'secondary', 'outlined'],
        iconOnly: false,
        endIcon: true,
        class: 'px-4',
      },
      {
        variant: ['primary', 'secondary', 'outlined'],
        iconOnly: false,
        size: ['small', 'xsmall'],
        class: 'px-2',
      },
      {
        variant: ['text', 'text-default'],
        class: 'disabled:stroke-slate-400 disabled:text-slate-400',
      },
      {
        variant: ['text'],
        disabled: false,
        class: 'hover:stroke-blue-950 hover:text-blue-950',
      },
      {
        variant: ['text-default'],
        disabled: false,
        class: 'hover:opacity-80',
      },
    ],
  }
);

export interface ButtonVariants extends VariantProps<typeof buttonVariants> {}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
    Omit<ButtonVariants, 'disabled' | 'href' | 'startIcon' | 'endIcon'>,
    Partial<Pick<HTMLAnchorElement, 'target'>> {
  href?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    { href, className, variant, size, children, iconOnly, startIcon, endIcon, fullWidth, ...rest }: ButtonProps,
    ref
  ) => {
    const Component = href && !rest.disabled ? 'a' : 'button';

    return (
      <Component
        ref={ref as never}
        type='button'
        href={href}
        className={clsxMerge(
          buttonVariants({
            href: Boolean(href),
            variant,
            size,
            iconOnly,
            startIcon: Boolean(startIcon),
            endIcon: Boolean(endIcon),
            disabled: Boolean(rest?.disabled),
            fullWidth,
          }),
          className
        )}
        {...rest}
      >
        {startIcon}
        <span>{children}</span>
        {endIcon}
      </Component>
    );
  }
);

Button.displayName = 'Button';
