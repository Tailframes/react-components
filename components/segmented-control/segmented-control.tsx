import { useCallback, useEffect, useState } from 'react';
import { clsxMerge } from '../../utils';
import { SegmentedControlItem, type SegmentedControlItemProps } from './segmented-control-item';

export interface SegmentedControlProps {
  /** Custom className. */
  className?: string;
  /** Current value. */
  value?: string;
  /** Callback on change. */
  onChange?: (value: string) => void;
  /** List of items. */
  items: Omit<SegmentedControlItemProps, 'isActive'>[];
}

export function SegmentedControl({ items, onChange, value, className }: SegmentedControlProps) {
  const [activeItem, setActiveItem] = useState(items.find(item => item.value === value)?.value ?? items[0].value);

  const handleChange = useCallback(
    (value: string) => {
      if (value === activeItem) {
        return;
      }

      onChange?.(value);

      setActiveItem(value);
    },
    [activeItem, onChange]
  );

  useEffect(() => {
    const itemValue = items.find(item => item.value === value)?.value;
    if (itemValue) {
      setActiveItem(itemValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div
      className={clsxMerge(
        'inline-flex h-9 w-full items-baseline justify-start rounded-lg bg-gray-100 p-1 sm:w-auto',
        className
      )}
    >
      {items.map(item => (
        <SegmentedControlItem key={item.value} onChange={handleChange} isActive={activeItem === item.value} {...item} />
      ))}
    </div>
  );
}

SegmentedControl.displayName = 'SegmentedControl';
