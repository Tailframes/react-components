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
  compoundVariants: [],
});

export interface SegmentedControlProps {
  items: Array<ButtonProps & { tooltip?: TooltipProps }>;
}

export function SegmentedControl({ items }: SegmentedControlProps) {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className='inline-flex h-9 w-full items-baseline justify-start rounded-lg bg-gray-100 p-1 sm:w-auto'>
      {items.map(({ tooltip, ...buttonProps }, index) => {
        const root = (
          <Button
            key={index}
            size='small'
            variant='text'
            className={segmentedControlVariants({ active: activeItem === index })}
            onClick={() => {
              setActiveItem(index);
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
