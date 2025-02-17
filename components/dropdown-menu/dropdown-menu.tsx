import { cva } from 'class-variance-authority';
import React, { createContext, type ReactNode, useId } from 'react';
import { clsxMerge, joinClassNames } from '../../utils';
import { DropdownMenuTrigger, type DropdownMenuTriggerProps } from './dropdown-menu-trigger';
import { Portal } from '../portal';
import { useDropdown, type UseDropdownProps } from '../../hooks/use-dropdown';

const dropdownDropdownVariants = cva(
  joinClassNames(
    'absolute z-50 flex w-full scale-50 flex-col gap-1 overflow-auto rounded-lg border border-slate-200 bg-white p-1 drop-shadow-lg transition-[opacity,transform] duration-300 ease-in-out',
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

export interface DropdownProps extends UseDropdownProps {
  /** Custom className for the dropdown button. */
  triggerButtonProps: Omit<
    DropdownMenuTriggerProps,
    'isOpened' | 'onDropdownClose' | 'onDropdownOpen' | 'showDropdown' | 'toggleDropdown'
  >;
  /** Custom className for the dropdown container. */
  containerClassName?: string;
  /** Custom className for the dropdown. */
  dropdownClassName?: string;
  /** Dropdown content. */
  children: ReactNode;
}

export function DropdownMenu({
  triggerButtonProps,
  containerClassName,
  dropdownClassName,
  dropdownPortalContainerId,
  children,
  width,
  alignment = 'center',
  onDropdownClose,
  onDropdownOpen,
}: DropdownProps) {
  const dropdownId = useId();
  const {
    triggerRef,
    dropdownRef,
    isOpened,
    showDropdown,
    dropdownPosition,
    toggleDropdown,
    registerItem,
    unregisterItem,
    activeItem,
  } = useDropdown({
    alignment,
    dropdownPortalContainerId,
    onDropdownClose,
    onDropdownOpen,
    width,
  });

  return (
    <DropdownContext.Provider
      value={{ isOpened, toggleDropdown, dropdownId, registerItem, unregisterItem, activeItem }}
    >
      <div className={clsxMerge('inline-flex w-full flex-col items-start gap-1.5', containerClassName)}>
        <DropdownMenuTrigger ref={triggerRef} {...triggerButtonProps} />
        <Portal container={dropdownPortalContainerId ? document.getElementById(dropdownPortalContainerId) : undefined}>
          <ul
            id={dropdownId}
            ref={dropdownRef}
            className={clsxMerge(dropdownDropdownVariants({ isOpened: showDropdown }), dropdownClassName)}
            style={dropdownPosition}
            role='menu'
            aria-hidden={!showDropdown}
          >
            {children}
          </ul>
        </Portal>
      </div>
    </DropdownContext.Provider>
  );
}

DropdownMenu.displayName = 'DropdownMenu';

// Dropdown context

export interface DropdownContextProps {
  isOpened: boolean;
  toggleDropdown: () => void;
  dropdownId: string;
  registerItem: (item: HTMLElement) => void;
  unregisterItem: (item: HTMLElement) => void;
  activeItem: HTMLElement | null;
}

export const DropdownContext = createContext<DropdownContextProps | null>(null);
