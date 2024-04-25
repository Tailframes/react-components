import { cva } from 'class-variance-authority';
import { useState } from 'react';
import { Button, type ButtonProps } from './button';
import { Tooltip, type TooltipProps } from './tooltip';

const segmentedControlVariants = cva('h-7 text-slate-950', {
  variants: {
    active: {
      true: 'rounded-md bg-white px-0 shadow md:w-auto md:px-3',
      false: 'bg-transparent md:w-auto md:px-3',
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
    <div className='hidden h-9 items-baseline justify-start rounded-lg bg-gray-100 p-1 md:inline-flex'>
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
          <Tooltip key={tooltip.value} {...tooltip}>
            {root}
          </Tooltip>
        ) : (
          root
        );
      })}
    </div>
  );
}
