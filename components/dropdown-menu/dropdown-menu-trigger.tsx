import React, { type Context, forwardRef, useContext } from 'react';
import { handleKeyboardEvent } from '../../utils';
import { Button, type ButtonProps } from '../button';
import { DropdownContext, type DropdownContextProps } from './dropdown-menu';

export interface DropdownMenuTriggerProps extends Omit<ButtonProps, 'onChange' | 'value'> {
  /** Custom className for the dropdown button. */
  buttonClassName?: string;
  /** Custom component for the dropdown trigger button. */
  customComponent?: boolean;
  /** @ignore */
  ref?: React.Ref<HTMLButtonElement>;
}

export const DropdownMenuTrigger = forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ size = 'medium', buttonClassName, customComponent, ...rest }, ref) => {
    const { toggleDropdown, isOpened, dropdownId } = useContext(DropdownContext as Context<DropdownContextProps>);

    const handleKeyboardEvents = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      e.preventDefault();

      handleKeyboardEvent('Enter', toggleDropdown)(e);
    };

    const Component = customComponent ? 'button' : Button;

    return (
      <Component
        ref={ref}
        onClick={toggleDropdown}
        onKeyDown={handleKeyboardEvents}
        className={buttonClassName}
        aria-haspopup='menu'
        aria-expanded={isOpened}
        aria-controls={dropdownId}
        {...rest}
      />
    );
  }
);

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';
