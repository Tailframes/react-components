import { cva } from 'class-variance-authority';
import React, {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type FocusEvent,
  type SyntheticEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';
import { ChevronDownIcon } from '../../assets/chevron-down-icon';
import { CloseIcon } from '../../assets/close-icon';
import { clsxMerge, handleKeyboardEvent, joinClassNames } from '../../utils';
import { Label } from '../label';
import { Portal } from '../portal';
import { SelectOption, type SelectOptionProps, type SelectOptionValue } from './select-option';

const selectButtonVariants = cva(
  joinClassNames(
    'relative w-full truncate rounded-lg border border-slate-200 bg-white stroke-black px-3 py-2.5 pr-10 text-left text-sm font-medium text-black transition-all duration-300 ease-in-out',
    'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:stroke-slate-400 disabled:text-slate-400 disabled:placeholder-slate-400'
  ),
  {
    variants: {
      size: {
        large: 'min-h-10 py-2.5',
        medium: 'min-h-[38px] py-2',
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
  joinClassNames(
    'absolute z-10 flex max-h-60 w-full scale-50 flex-col gap-1 overflow-auto rounded-lg border border-slate-200 bg-white py-1 text-sm drop-shadow-lg transition-[opacity,transform] duration-300 ease-in-out',
    'scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-500 active:scrollbar-thumb-slate-500'
  ),
  {
    variants: {
      isOpened: {
        true: 'scale-100 opacity-100',
        false: 'scale-[0.98] opacity-0',
      },
    },
  }
);

export interface SelectVariants {
  disabled?: boolean;
  /** If true, the select will be in an error state. */
  error?: boolean;
  /** The size of the select. */
  size?: 'medium' | 'large';
}

export interface SelectProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'>,
    SelectVariants {
  /** Custom className for the select button. */
  buttonClassName?: string;
  /** If true, a checkbox will be shown for each option. */
  checkboxes?: boolean;
  /** If true, the clear button will be shown. */
  clearable?: boolean;
  /** Custom className for the select container. */
  containerClassName?: string;
  /** If true, select will be disabled. */
  disabled?: boolean;
  /** Custom className for the dropdown. */
  dropdownClassName?: string;
  /** If provided, dropdown will be rendered in an element with the given id. */
  dropdownPortalContainerId?: string;
  /** The label for the select. */
  label?: string;
  /** If true, multiple values can be selected. */
  multiple?: boolean;
  /** Callback when the value changes. */
  onChange?: (value: SelectOptionValue | SelectOptionValue[]) => void;
  /** Callback when the clear button is clicked. */
  onClear?: () => void;
  /** Callback when the dropdown is closed. */
  onDropdownClose?: () => void;
  /** Callback when the dropdown is opened. */
  onDropdownOpen?: () => void;
  /** The options for the select. */
  options: Pick<SelectOptionProps, 'value' | 'label' | 'startAdornment' | 'endAdornment'>[];
  /** The placeholder text to display in the select. */
  placeholder?: string;
  /** The current value of the select. */
  value?: SelectOptionValue | SelectOptionValue[];
}

export function Select({
  checkboxes = false,
  clearable = true,
  disabled = false,
  error = false,
  multiple = false,
  options,
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
  dropdownPortalContainerId,
  ...rest
}: SelectProps) {
  const buttonId = useId();
  const labelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const [focusedOption, setFocusedOption] = useState<SelectOptionValue | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isSelected, setIsSelected] = useState<SelectOptionValue[]>(
    options.filter(o => (Array.isArray(value) ? value.includes(o.value) : o.value === value)).map(o => o.value)
  );
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<Pick<CSSProperties, 'top' | 'left' | 'width'>>({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (isOpened) {
      setShowDropdown(true);
    }
  }, [isOpened]);

  useEffect(() => {
    if (!showDropdown) {
      const timer = setTimeout(() => {
        setIsOpened(false);
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showDropdown]);

  useLayoutEffect(() => {
    const updateDropdownPosition = () => {
      if (isOpened && buttonRef.current) {
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

    if (dropdownPortalContainerId) {
      document.getElementById(dropdownPortalContainerId)?.addEventListener('scroll', updateDropdownPosition);
    }

    return () => {
      window.removeEventListener('resize', updateDropdownPosition);
      if (dropdownPortalContainerId) {
        document.getElementById(dropdownPortalContainerId)?.removeEventListener('scroll', updateDropdownPosition);
      }
    };
  }, [dropdownPortalContainerId, isOpened]);

  const handleDropdownOpen = useCallback(() => {
    if (!isOpened) {
      onDropdownOpen?.();
    }

    setIsOpened(true);
  }, [onDropdownOpen, isOpened]);

  const handleDropdownClose = useCallback(() => {
    if (showDropdown) {
      onDropdownClose?.();
    }

    setShowDropdown(false);
    setFocusedOption(null);
  }, [onDropdownClose, showDropdown]);

  const toggleDropdown = useCallback(() => {
    if (isOpened) {
      handleDropdownClose();
    } else {
      handleDropdownOpen();
    }
  }, [handleDropdownClose, handleDropdownOpen, isOpened]);

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!buttonRef.current?.contains(e.relatedTarget) && !dropdownRef.current?.contains(e.relatedTarget)) {
      handleDropdownClose();
    }
  };

  const handleSelect = useCallback(
    (option: SelectOptionValue) => {
      if (multiple) {
        setIsSelected(prevSelected => {
          if (prevSelected.find(o => o === option)) {
            const newSelected = prevSelected.filter(selected => selected !== option).sort(sortOptions);
            onChange?.(newSelected);

            return newSelected;
          } else {
            const newSelected = [...prevSelected, option].sort(sortOptions);
            onChange?.(newSelected);

            return newSelected;
          }
        });
      } else {
        setIsSelected([option]);
        onChange?.(option);
        handleDropdownClose();
      }
    },
    [handleDropdownClose, multiple, onChange]
  );

  const handleClear = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();

      setIsSelected([]);
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

      handleKeyboardEvent(['Delete', 'Backspace'], handleClear)(e);

      // handle "Escape" and "Arrow" keys only when dropdown is open
      if (!isOpened) {
        return;
      }

      handleKeyboardEvent<HTMLButtonElement>('Escape', handleDropdownClose)(e);

      handleKeyboardEvent<HTMLButtonElement>('ArrowUp', () => {
        setFocusedOption(prevFocusedOption => {
          if (prevFocusedOption) {
            const index = options.findIndex(o => o.value === prevFocusedOption);
            const newIndex = index > 0 ? index - 1 : options.length - 1;

            return options[newIndex].value;
          } else {
            return options[options.length - 1].value;
          }
        });
      })(e);

      handleKeyboardEvent<HTMLButtonElement>('ArrowDown', () => {
        setFocusedOption(prevFocusedOption => {
          if (prevFocusedOption) {
            const index = options.findIndex(o => o.value === prevFocusedOption);
            const newIndex = index < options.length - 1 ? index + 1 : 0;

            return options[newIndex].value;
          } else {
            return options[0].value;
          }
        });
      })(e);
    },
    [focusedOption, handleClear, handleDropdownClose, handleSelect, isOpened, options, toggleDropdown]
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
        aria-expanded={isOpened}
        disabled={disabled}
        {...rest}
      >
        {isSelected.length > 0
          ? options
              .filter(o => isSelected.includes(o.value))
              .map(o => o.label)
              .join(', ')
          : placeholder}
        <span className='absolute right-0 top-1/2 w-5 -translate-x-1/2 -translate-y-1/2'>
          {clearable && isSelected.length > 0 ? (
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
      {isOpened && (
        <Portal container={dropdownPortalContainerId ? document.getElementById(dropdownPortalContainerId) : undefined}>
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
                onSelect={handleSelect}
                isSelected={isSelected.some(o => o === option.value)}
                checkboxes={checkboxes}
                isFocused={focusedOption === option.value}
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

const sortOptions = (a: SelectOptionValue, b: SelectOptionValue) => {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  }

  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return a ? 1 : -1;
  }

  return 0;
};
