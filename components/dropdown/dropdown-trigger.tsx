import React, { forwardRef, type KeyboardEvent, useCallback } from 'react';
import { handleKeyboardEvent } from '../../utils';
import { Button, type ButtonProps } from '../button';

export interface DropdownTriggerProps extends Omit<ButtonProps, 'onChange' | 'value'> {
  /** Custom className for the dropdown button. */
  buttonClassName?: string;
  /** Custom component for the dropdown trigger button. */
  customComponent?: boolean;
  /** @ignore */
  isOpened: boolean;
  /** @ignore */
  showDropdown: boolean;
  /** @ignore */
  ref?: React.Ref<HTMLButtonElement>;
  /** @ignore */
  onDropdownClose: () => void;
  /** @ignore */
  onDropdownOpen: () => void;
}

export const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  (
    {
      size = 'medium',
      buttonClassName,
      customComponent,
      isOpened,
      onDropdownClose,
      onDropdownOpen,
      showDropdown,
      ...rest
    }: DropdownTriggerProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const toggleDropdown = useCallback(() => {
      if (isOpened) {
        onDropdownClose();
      } else {
        onDropdownOpen();
      }
    }, [isOpened, onDropdownClose, onDropdownOpen]);

    const handleKeyboardEvents = useCallback(
      (e: KeyboardEvent<HTMLButtonElement>) => {
        e.preventDefault();

        handleKeyboardEvent<HTMLButtonElement>('Enter', toggleDropdown)(e);

        // handle "Escape" key only when dropdown is open
        if (!isOpened) {
          return;
        }

        handleKeyboardEvent<HTMLButtonElement>('Escape', onDropdownClose)(e);
      },
      [onDropdownClose, isOpened, toggleDropdown]
    );

    const Component = customComponent ? 'button' : Button;

    return (
      <Component
        ref={ref}
        onClick={toggleDropdown}
        onKeyDown={handleKeyboardEvents}
        className={buttonClassName}
        aria-haspopup='listbox'
        aria-expanded={isOpened}
        {...rest}
      />
    );
  }
);

DropdownTrigger.displayName = 'DropdownTrigger';
