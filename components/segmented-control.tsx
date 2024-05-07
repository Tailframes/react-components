import { cva } from 'class-variance-authority';
import { useState } from 'react';
import { clsxMerge } from '../utils';
import { Button, type ButtonProps } from './button';
import { Tooltip, type TooltipProps } from './tooltip';

const segmentedControlVariants = cva('h-7 text-slate-950', {
  variants: {
    active: {
      true: 'w-full rounded-md bg-white px-3 shadow sm:w-auto',
      false: 'w-full bg-transparent px-3 sm:w-auto',
    },
  },
});
export interface SegmentedControlProps {
  value?: string;
  onChange?: (value: string) => void;
  items: Array<ButtonProps & { value?: string; tooltip?: TooltipProps }>;
}

export function SegmentedControl({ items, onChange, value }: SegmentedControlProps) {
  const [activeItem, setActiveItem] = useState(
    items.findIndex(item => item.value === value || item.children === value) || 0
  );

  const handleChange = (index: number, value?: string) => {
    if (index === activeItem) {
      return;
    }

    if (value) {
      onChange?.(value);
    }

    setActiveItem(index);
  };

  return (
    <div className='inline-flex h-9 w-full items-baseline justify-start rounded-lg bg-gray-100 p-1 sm:w-auto'>
      {items.map(({ value, tooltip, ...buttonProps }, index) => {
        const root = (
          <Button
            key={index}
            size='small'
            variant='text'
            className={segmentedControlVariants({ active: activeItem === index })}
            aria-selected={activeItem === index}
            onClick={() => {
              handleChange(index, value);
            }}
            {...buttonProps}
          />
        );

        return tooltip ? (
          <Tooltip
            key={tooltip.value}
            {...tooltip}
            containerClassName={clsxMerge(tooltip.containerClassName, 'w-full sm:w-auto')}
          >
            {root}
          </Tooltip>
        ) : (
          root
        );
      })}
    </div>
  );
}
