import { cva } from 'class-variance-authority';
import React, { type ReactNode, useId } from 'react';
import { clsxMerge, handleKeyboardEvent, joinClassNames } from '../../utils';
import { Checkbox } from '../checkbox';
import { type SelectProps } from './select';

const selectOptionVariants = cva(
  joinClassNames(
    'relative mx-1 flex cursor-pointer select-none items-center justify-between rounded px-2 py-1.5 text-sm font-normal text-slate-700',
    'hover:bg-blue-100 hover:stroke-blue-700 hover:text-blue-700'
  ),
  {
    variants: {
      isSelected: {
        true: 'bg-blue-50 font-medium text-blue-700',
        false: '',
      },
      isFocused: {
        true: 'bg-blue-100 text-blue-700',
        false: '',
      },
    },
  }
);

export type SelectOptionValue = string | number | boolean;

export interface SelectOptionProps {
  /** @ignore */
  checkboxes?: SelectProps['checkboxes'];
  /** End adornment of the option e.g. icon */
  endAdornment?: ReactNode;
  /** @ignore */
  isFocused?: boolean;
  /** @ignore */
  isSelected?: boolean;
  /** The label of the option. */
  label: string;
  /** @ignore */
  onSelect?: (option: SelectOptionValue) => void;
  /** Start adornment of the option e.g. icon */
  startAdornment?: ReactNode;
  /** The value of the option, one of: `string` | `number` | `boolean`. */
  value: SelectOptionValue;
}

export function SelectOption({
  label,
  value,
  onSelect,
  checkboxes,
  isSelected,
  isFocused,
  endAdornment,
  startAdornment,
}: SelectOptionProps) {
  const id = useId();

  return (
    <li
      className={clsxMerge(selectOptionVariants({ isSelected, isFocused }))}
      role='option'
      tabIndex={-1}
      onClick={() => {
        onSelect?.(value);
      }}
      onKeyDown={handleKeyboardEvent('Enter', () => {
        onSelect?.(value);
      })}
      aria-selected={isSelected}
      aria-labelledby={label ? id : undefined}
    >
      <div className='flex w-full items-center justify-start gap-2'>
        {checkboxes && <Checkbox size='small' checked={isSelected} />}
        {startAdornment && (
          <span className='inline-flex size-[18px] items-center justify-center overflow-hidden'>{startAdornment}</span>
        )}
        {label && (
          <span id={id} className='truncate'>
            {label}
          </span>
        )}
      </div>
      {endAdornment && <span className='ml-3'>{endAdornment}</span>}
    </li>
  );
}

SelectOption.displayName = 'SelectOption';
