import { clsxMerge, kebabCase } from '../../utils';
import { Badge, type BadgeProps } from '../badge';
import { Button } from '../button';
import { cva } from 'class-variance-authority';
import { type ReactNode } from 'react';

const tabVariants = cva(
  'box-content rounded-none border-b-2 border-b-transparent p-0 font-normal transition-all duration-100 ease-in-out',
  {
    variants: {
      isActive: {
        true: 'rounded-none border-b-blue-700 stroke-blue-700 font-semibold text-blue-700',
        false: '',
      },
      disabled: {
        true: 'text-slate-400',
        false: '',
      },
    },
  }
);

export interface TabVariants {
  /** @ignore */
  isActive?: boolean;
  disabled?: boolean;
}

export interface TabProps extends TabVariants {
  label: string;
  value: string;
  startAdornment?: ReactNode;
  badge?: BadgeProps;
  /** @ignore */
  onClick: (value: TabProps['value']) => void;
}

export function Tab({ value, label, startAdornment, badge, onClick, isActive, disabled }: TabProps) {
  return (
    <li role='presentation'>
      <Button
        variant='text-default'
        className={clsxMerge(tabVariants({ isActive, disabled }))}
        id={`tab-${value}`}
        role='tab'
        aria-controls={kebabCase(`tab-panel-${value}`)}
        aria-selected={isActive}
        onClick={() => {
          onClick(value);
        }}
        disabled={disabled}
        startAdornment={startAdornment}
        endAdornment={
          badge ? (
            <Badge
              variant={isActive ? 'primary' : 'secondary'}
              className={disabled ? 'border-transparent bg-slate-100 text-slate-400' : ''}
              {...badge}
            />
          ) : undefined
        }
        tabIndex={0}
      >
        {label}
      </Button>
    </li>
  );
}

Tab.displayName = 'Tab';
