import { clsxMerge, kebabCase } from '../utils';
import { Badge, type BadgeProps } from './badge';
import { Button } from './button';
import { cva } from 'class-variance-authority';
import { type HTMLAttributes, type ReactNode, useState } from 'react';

const tabVariants = cva(
  'box-content rounded-none border-b-2 border-b-transparent p-0 font-normal transition-all duration-100 ease-in-out',
  {
    variants: {
      active: {
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
  active?: boolean;
  disabled?: boolean;
}

export interface TabItem {
  label: string;
  content: ReactNode;
  disabled?: boolean;
  startIcon?: ReactNode;
  badge?: BadgeProps;
}

export interface TabProps extends HTMLAttributes<HTMLDivElement>, TabVariants {
  name?: string;
  items: TabItem[];
}

// TODO https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
export function Tabs({ name, className, items, ...rest }: TabProps) {
  const [activeTab, setActiveTab] = useState(items[0].label);

  return (
    <div className='w-full'>
      <div className={clsxMerge('mb-4 border-b border-gray-200', className)} {...rest}>
        <ul className='-mb-px flex space-x-6 overflow-auto text-center text-sm font-medium' role='tablist'>
          {items.map(({ label, disabled, startIcon, badge }, index) => {
            const isActive = label === activeTab;

            return (
              <li key={index} role='presentation'>
                <Button
                  variant='text-default'
                  className={clsxMerge(tabVariants({ active: isActive, disabled }))}
                  id={`${name ? `${name}-` : ''}tab-${index}`}
                  role='tab'
                  aria-controls={kebabCase(`${name ? `${name}-` : ''}tab-panel-${index}`)}
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveTab(label);
                  }}
                  disabled={disabled}
                  startIcon={startIcon}
                  endIcon={
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
          })}
        </ul>
      </div>
      <div>
        {items.map(({ label, content }, index) => (
          <div
            key={index}
            id={kebabCase(`${name ? `${name}-` : ''}tab-panel-${index}`)}
            className={`${label === activeTab ? '' : 'hidden'}`}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}

Tabs.displayName = 'Tabs';
