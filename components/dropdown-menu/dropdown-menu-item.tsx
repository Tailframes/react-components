import React, { type Context, forwardRef, useContext, useEffect, useRef } from 'react';
import { clsxMerge, handleKeyboardEvent, joinClassNames } from '../../utils';
import { Button, type ButtonProps } from '../button';
import { DropdownContext, type DropdownContextProps } from './dropdown-menu';

export interface DropdownMenuItemProps extends ButtonProps {}

export const DropdownMenuItem = forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ className, children, onClick, ...rest }, forwardedRef) => {
    const { toggleDropdown, registerItem, unregisterItem } = useContext<DropdownContextProps>(
      DropdownContext as Context<DropdownContextProps>
    );
    const itemRef = useRef<HTMLButtonElement | null>(null);

    const setRefs = (node: HTMLButtonElement) => {
      itemRef.current = node;

      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      onClick?.(e);
      toggleDropdown();
    };

    useEffect(() => {
      if (itemRef.current) {
        registerItem(itemRef.current);
      }

      return () => {
        if (itemRef.current) {
          unregisterItem(itemRef.current);
        }
      };
    }, [registerItem, unregisterItem]);

    return (
      <li>
        <Button
          ref={setRefs}
          role='menuitem'
          tabIndex={-1}
          variant='text-default'
          size='small'
          fullWidth
          className={clsxMerge(
            joinClassNames(
              'justify-start rounded stroke-slate-700 text-sm font-normal text-slate-700 transition-colors duration-300 ease-in-out',
              'hover:bg-blue-50 hover:text-blue-700 hover:opacity-100 focus:bg-blue-50 focus:text-blue-700'
            ),
            className
          )}
          contentClassName='flex flex-1'
          onKeyDown={handleKeyboardEvent('Enter', e => {
            e.preventDefault();

            onClick?.(e as React.MouseEvent<HTMLButtonElement>);
            toggleDropdown();
          })}
          onClick={handleClick}
          {...rest}
        >
          {children}
        </Button>
      </li>
    );
  }
);

DropdownMenuItem.displayName = 'DropdownMenuItem';
