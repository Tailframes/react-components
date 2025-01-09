import { clsxMerge, joinClassNames } from '../utils';
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  joinClassNames(
    'group inline-flex items-center justify-center whitespace-nowrap rounded-lg py-2 align-middle text-sm font-semibold leading-none transition-all duration-300 ease-in-out',
    'disabled:cursor-not-allowed'
  ),
  {
    variants: {
      variant: {
        primary: 'bg-blue-700 stroke-white px-6 text-white hover:bg-blue-950',
        secondary: 'bg-blue-50 stroke-blue-700 px-6 text-blue-700 hover:bg-blue-100',
        outlined:
          'border border-slate-200 bg-transparent stroke-black px-6 text-black hover:border-blue-700 hover:bg-blue-700 hover:stroke-white hover:text-white',
        text: 'stroke-blue-700 px-2 text-blue-700',
        'text-default': 'stroke-slate-500 px-2 text-black',
      },
      size: {
        large: 'h-[42px] min-w-[42px] gap-2',
        medium: 'h-[38px] min-w-[38px] gap-2',
        small: 'h-8 min-w-[32px] gap-1.5 text-xs',
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
      startAdornment: {
        true: '',
        false: '',
      },
      endAdornment: {
        true: '',
        false: '',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
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
        startAdornment: true,
        class: 'px-4',
      },
      {
        variant: ['primary', 'secondary', 'outlined'],
        iconOnly: false,
        endAdornment: true,
        class: 'px-4',
      },
      {
        variant: ['primary', 'secondary', 'outlined'],
        iconOnly: false,
        size: ['small'],
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

export interface ButtonVariants {
  disabled?: boolean;
  endAdornment?: boolean;
  /** If true, the button will be full width. */
  fullWidth?: boolean;
  href?: boolean;
  /** Should be used with icon content, removes the horizontal padding from the button. */
  iconOnly?: boolean;
  /** Size of the button. */
  size?: 'small' | 'medium' | 'large';
  startAdornment?: boolean;
  /** Variant of the button. */
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'text-default';
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement>,
    Omit<ButtonVariants, 'href' | 'startAdornment' | 'endAdornment'>,
    Partial<Pick<HTMLAnchorElement, 'target'>> {
  /** The content of the button. */
  children: ReactNode;
  /** If true, the button will be disabled. */
  disabled?: boolean;
  /** The href of the button. */
  href?: string;
  /** Start adornment of the button e.g. an icon. */
  startAdornment?: ReactNode;
  /** End adornment of the button, e.g. an icon. */
  endAdornment?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      iconOnly = false,
      fullWidth = false,
      disabled = false,
      href,
      className,
      children,
      startAdornment,
      endAdornment,
      ...rest
    }: ButtonProps,
    ref
  ) => {
    const Component = href && !disabled ? 'a' : 'button';

    return (
      <Component
        ref={ref as never}
        type='button'
        href={href}
        aria-disabled={disabled}
        className={clsxMerge(
          buttonVariants({
            href: Boolean(href),
            variant,
            size,
            iconOnly,
            startAdornment: Boolean(startAdornment),
            endAdornment: Boolean(endAdornment),
            disabled,
            fullWidth,
          }),
          className
        )}
        disabled={disabled}
        {...rest}
      >
        {startAdornment}
        {children && <div>{children}</div>}
        {endAdornment}
      </Component>
    );
  }
);

Button.displayName = 'Button';
