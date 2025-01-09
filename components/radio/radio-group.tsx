import { cva } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import { clsxMerge } from '../../utils';

const radioGroupVariants = cva('flex', {
  variants: {
    direction: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
    space: {
      small: 'gap-3',
      medium: 'gap-6',
      large: 'gap-12',
    },
  },
});

export interface RadioGroupVariants {
  /** Direction of `Radio` components. */
  direction?: 'horizontal' | 'vertical';
  /** Space between `Radio` components. */
  space?: 'small' | 'medium' | 'large';
}

interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'>, RadioGroupVariants {
  /** `Radio` components. */
  children: ReactNode;
}

export function RadioGroup({
  children,
  className,
  direction = 'horizontal',
  space = 'medium',
  ...rest
}: RadioGroupProps) {
  return (
    <div role='radiogroup' className={clsxMerge(radioGroupVariants({ direction, space }), className)} {...rest}>
      {children}
    </div>
  );
}

RadioGroup.displayName = 'RadioGroup';
