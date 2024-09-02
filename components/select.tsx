import { useLayoutEffect } from '@radix-ui/react-use-layout-effect';
import { cva } from 'class-variance-authority';
import React, {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type FocusEvent,
  type ReactNode,
  type SyntheticEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
  useCallback,
} from 'react';
import { ChevronDownIcon } from '../assets/chevron-down-icon';
import { CloseIcon } from '../assets/close-icon';
import { clsxMerge, handleKeyboardEvent } from '../utils';
import { Checkbox } from './checkbox';
import { Label } from './label';
import { Portal } from './portal';

const selectButtonVariants = cva(
  'relative w-full truncate rounded-lg border border-slate-200 bg-white stroke-black px-3 py-2.5 pr-10 text-left text-sm font-medium text-black transition-all duration-300 ease-in-out ' +
    'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:placeholder-slate-400',
  {
    variants: {
      size: {
        large: 'py-2.5',
        medium: 'py-2',
      },
      error: {
        true: 'border-red-500 stroke-red-500 text-red-500 ring-1 ring-red-500 focus:border-red-500 focus:stroke-red-500 focus:text-black focus:ring-red-500 focus:ring-offset-0',
        false: '',
      },
      isOpened: {
        true: 'border-blue-600 stroke-blue-700 ring-1 ring-blue-600',
        false: '',
      },
    },
  }
);

const inputLabelVariants = cva('whitespace-nowrap', {
  variants: {
    disabled: {
      true: 'text-slate-400',
      false: 'text-black',
    },
  },
});

const selectDropdownVariants = cva(
  'absolute z-10 flex max-h-60 w-full scale-50 flex-col gap-1 overflow-auto rounded-lg border border-slate-200 bg-white py-1 text-sm drop-shadow-lg transition-[opacity,transform] duration-300 ease-in-out ' +
    'scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-500 active:scrollbar-thumb-slate-500',
  {
    variants: {
      isOpened: {
        true: 'scale-100 opacity-100',
        false: 'scale-[0.98] opacity-0',
      },
    },
  }
);

const selectOptionVariants = cva(
  'relative mx-1 flex cursor-pointer select-none items-center justify-between rounded px-2 py-1.5 text-sm font-normal text-slate-700 hover:bg-blue-100 hover:text-blue-700',
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

export interface SelectVariants {
  disabled?: boolean;
  error?: boolean;
  size?: 'medium' | 'large';
}

export interface SelectOptionType {
  disabled?: boolean;
  endAdornment?: string;
  label: string;
  startAdornment?: ReactNode;
  value: string | number | boolean;
}

interface SelectOptionProps extends Pick<SelectProps, 'checkboxes'>, SelectOptionType {
  handleSelect: (option: SelectOptionType) => void;
  isSelected?: boolean;
  isFocused?: boolean;
}

function SelectOption({ handleSelect, checkboxes, isSelected, isFocused, ...option }: SelectOptionProps) {
  const id = useId();

  return (
    <li
      className={clsxMerge(selectOptionVariants({ isSelected, isFocused }))}
      role='option'
      tabIndex={-1}
      onClick={() => {
        handleSelect(option);
      }}
      onKeyDown={handleKeyboardEvent('Enter', () => {
        handleSelect(option);
      })}
      aria-selected={isSelected}
      aria-labelledby={option.label ? id : undefined}
    >
      <div className='flex w-full items-center justify-start gap-2'>
        {checkboxes && <Checkbox size='small' disabled={option.disabled} checked={isSelected} />}
        {!checkboxes && option.startAdornment && (
          <span className='inline-flex size-[18px] items-center justify-center overflow-hidden'>
            {option.startAdornment}
          </span>
        )}
        {option.label && (
          <span id={id} className='truncate'>
            {option.label}
          </span>
        )}
      </div>
      {option.endAdornment && <span className='ml-3'>{option.endAdornment}</span>}
    </li>
  );
}

export interface SelectProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'>,
    SelectVariants {
  buttonClassName?: string;
  /**
   * Whether the option should be displayed as a checkbox, requires `multiple` prop to be true
   */
  checkboxes?: boolean;
  clearable?: boolean;
  containerClassName?: string;
  disabled?: boolean;
  dropdownClassName?: string;
  label?: string;
  multiple?: boolean;
  onChange?: (value: SelectOptionType | SelectOptionType[]) => void;
  onClear?: () => void;
  onDropdownClose?: () => void;
  onDropdownOpen?: () => void;
  options: SelectOptionType[];
  placeholder?: string;
  value?: SelectOptionType['value'] | Array<SelectOptionType['value']>;
}

export function Select({
  checkboxes = false,
  clearable = false,
  disabled = false,
  error = false,
  multiple = false,
  options = [],
  size = 'medium',
  value,
  label,
  placeholder,
  onChange,
  onClear,
  onDropdownClose,
  onDropdownOpen,
  buttonClassName,
  containerClassName,
  dropdownClassName,
  ...rest
}: SelectProps) {
  const buttonId = useId();
  const labelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [focusedOption, setFocusedOption] = useState<SelectOptionType | null>(null);
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState<SelectOptionType[]>(
    options.filter(o => (Array.isArray(value) ? value.includes(o.value) : o.value === value))
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<Pick<CSSProperties, 'top' | 'left' | 'width'>>({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (opened) {
      setShowDropdown(true);
    }
  }, [opened]);

  useEffect(() => {
    if (!showDropdown) {
      const timer = setTimeout(() => {
        setOpened(false);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showDropdown]);

  useLayoutEffect(() => {
    const updateDropdownPosition = () => {
      if (opened && buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: buttonRect.bottom + window.scrollY + 8,
          left: buttonRect.left + window.scrollX,
          width: buttonRect.width,
        });
      }
    };

    updateDropdownPosition();
    window.addEventListener('resize', updateDropdownPosition);

    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
    };
  }, [opened]);

  const handleDropdownOpen = useCallback(() => {
    if (!opened) {
      onDropdownOpen?.();
    }

    setOpened(true);
  }, [onDropdownOpen, opened]);

  const handleDropdownClose = useCallback(() => {
    if (showDropdown) {
      onDropdownClose?.();
    }

    setShowDropdown(false);
    setFocusedOption(null);
  }, [onDropdownClose, showDropdown]);

  const toggleDropdown = useCallback(() => {
    if (opened) {
      handleDropdownClose();
    } else {
      handleDropdownOpen();
    }
  }, [handleDropdownClose, handleDropdownOpen, opened]);

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLDivElement>) => {
      if (!buttonRef.current?.contains(e.relatedTarget) && !dropdownRef.current?.contains(e.relatedTarget)) {
        handleDropdownClose();
      }
    },
    [handleDropdownClose]
  );

  const handleSelect = useCallback(
    (option: SelectOptionType) => {
      if (multiple) {
        setSelected(prevSelected => {
          if (prevSelected.find(o => o.value === option.value)) {
            const newSelected = prevSelected.filter(o => o.value !== option.value).sort(sortOptions);
            onChange?.(newSelected);

            return newSelected;
          } else {
            const newSelected = [...prevSelected, option].sort(sortOptions);
            onChange?.(newSelected);

            return newSelected;
          }
        });
      } else {
        setSelected([option]);
        onChange?.(option);
        handleDropdownClose();
      }
    },
    [handleDropdownClose, multiple, onChange]
  );

  const handleClear = useCallback(
    (e: SyntheticEvent<SVGSVGElement>) => {
      e.stopPropagation();

      setSelected([]);
      onClear?.();
    },
    [onClear]
  );

  const handleKeyboardEvents = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      e.preventDefault();

      handleKeyboardEvent<HTMLButtonElement>('Enter', () => {
        if (focusedOption) {
          handleSelect(focusedOption);
        } else {
          toggleDropdown();
        }
      })(e);

      if (!opened) {
        return;
      }

      handleKeyboardEvent<HTMLButtonElement>('Escape', handleDropdownClose)(e);

      handleKeyboardEvent<HTMLButtonElement>('ArrowUp', () => {
        setFocusedOption(prevFocusedOption => {
          if (prevFocusedOption) {
            const index = options.findIndex(o => o.value === prevFocusedOption.value);
            const newIndex = index > 0 ? index - 1 : options.length - 1;

            return options[newIndex];
          } else {
            return options[options.length - 1];
          }
        });
      })(e);

      handleKeyboardEvent<HTMLButtonElement>('ArrowDown', () => {
        setFocusedOption(prevFocusedOption => {
          if (prevFocusedOption) {
            const index = options.findIndex(o => o.value === prevFocusedOption.value);
            const newIndex = index < options.length - 1 ? index + 1 : 0;

            return options[newIndex];
          } else {
            return options[0];
          }
        });
      })(e);
    },
    [focusedOption, handleDropdownClose, handleSelect, opened, options, toggleDropdown]
  );

  return (
    <div
      className={clsxMerge('inline-flex w-full flex-col items-start gap-1.5', containerClassName)}
      onBlur={handleBlur}
    >
      {label && (
        <Label
          id={labelId}
          htmlFor={rest.id ?? buttonId}
          size='small'
          className={clsxMerge(inputLabelVariants({ disabled }))}
        >
          {label}
        </Label>
      )}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        onKeyDown={handleKeyboardEvents}
        className={clsxMerge(selectButtonVariants({ error, size, isOpened: showDropdown }), buttonClassName)}
        aria-haspopup='listbox'
        aria-expanded={opened}
        disabled={disabled}
        {...rest}
      >
        {selected.length > 0 ? selected.map(option => option.label).join(', ') : placeholder}
        <span className='absolute right-0 top-1/2 w-5 -translate-x-1/2 -translate-y-1/2'>
          {clearable && selected.length > 0 ? (
            <CloseIcon
              className='size-5 stroke-inherit p-0.5 transition-transform duration-300 ease-in-out'
              onClick={handleClear}
            />
          ) : (
            <ChevronDownIcon
              className={clsxMerge('size-5 stroke-inherit transition-transform duration-300 ease-in-out', {
                'rotate-180': showDropdown,
              })}
            />
          )}
        </span>
      </button>
      {opened && (
        <Portal>
          <ul
            ref={dropdownRef}
            className={clsxMerge(selectDropdownVariants({ isOpened: showDropdown }), dropdownClassName)}
            style={dropdownPosition}
            role='listbox'
            aria-labelledby={labelId}
          >
            {options.map(option => (
              <SelectOption
                key={option.value.toString()}
                handleSelect={handleSelect}
                isSelected={selected.some(o => o.value === option.value)}
                checkboxes={checkboxes}
                isFocused={focusedOption === option}
                {...option}
              />
            ))}
          </ul>
        </Portal>
      )}
    </div>
  );
}

Select.displayName = 'Select';

// Helpers

const sortOptions = (a: SelectOptionType, b: SelectOptionType) => {
  if (typeof a.value === 'number' && typeof b.value === 'number') {
    return a.value - b.value;
  }

  if (typeof a.value === 'string' && typeof b.value === 'string') {
    return a.value.localeCompare(b.value);
  }

  if (typeof a.value === 'boolean' && typeof b.value === 'boolean') {
    return a.value ? 1 : -1;
  }

  return 0;
};
