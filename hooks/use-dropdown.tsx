import { type CSSProperties, type FocusEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface UseDropdownProps {
  /** Dropdown alignment. */
  alignment?: 'left' | 'center' | 'right';
  /** If provided, dropdown will be rendered in an element with the given id. */
  dropdownPortalContainerId?: string;
  /** Callback when the dropdown is closed. */
  onDropdownClose?: () => void;
  /** Callback when the dropdown is opened. */
  onDropdownOpen?: () => void;
  /** Dropdown width. */
  width?: number;
}

export function useDropdown({
  alignment,
  dropdownPortalContainerId,
  onDropdownOpen,
  onDropdownClose,
  width,
}: UseDropdownProps = {}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<HTMLElement[]>([]);
  const activeItemRef = useRef<HTMLElement | null>(null);

  const [isOpened, setIsOpened] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<Pick<CSSProperties, 'top' | 'left' | 'width'>>({
    top: 0,
    left: 0,
    width: 0,
  });

  const registerItem = useCallback((item: HTMLElement) => {
    if (!itemsRef.current.includes(item)) {
      itemsRef.current.push(item);
    }
  }, []);

  const unregisterItem = useCallback((item: HTMLElement) => {
    itemsRef.current = itemsRef.current.filter(i => i !== item);
  }, []);

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
      if (isOpened && triggerRef.current) {
        const buttonRect = triggerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: buttonRect.bottom + window.scrollY + 8,
          left: getLeftPosition(alignment, buttonRect, width),
          width: width ?? buttonRect.width,
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
  }, [alignment, dropdownPortalContainerId, isOpened, triggerRef, width]);

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
  }, [onDropdownClose, showDropdown]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDropdownClose();
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();

        const items = itemsRef.current;

        if (items.length === 0) {
          return;
        }

        const current = document.activeElement as HTMLElement;
        const index = items.indexOf(current);
        let nextIndex: number;

        if (e.key === 'ArrowDown') {
          nextIndex = index < 0 ? 0 : (index + 1) % items.length;
        } else {
          nextIndex = index < 0 ? items.length - 1 : (index - 1 + items.length) % items.length;
        }

        items[nextIndex]?.focus();
        activeItemRef.current = items[nextIndex];
      }
    };

    if (isOpened) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDropdownClose, isOpened]);

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!triggerRef.current?.contains(e.relatedTarget) && !dropdownRef.current?.contains(e.relatedTarget)) {
      handleDropdownClose();
    }
  };

  const toggleDropdown = useCallback(() => {
    if (isOpened) {
      handleDropdownClose();
    } else {
      handleDropdownOpen();
    }
  }, [handleDropdownClose, handleDropdownOpen, isOpened]);

  return {
    triggerRef,
    dropdownRef,
    isOpened,
    showDropdown,
    dropdownPosition,
    handleDropdownOpen,
    handleDropdownClose,
    handleBlur,
    toggleDropdown,
    registerItem,
    unregisterItem,
    activeItem: activeItemRef.current,
  };
}

// Helpers

const getLeftPosition = (alignment: UseDropdownProps['alignment'], buttonRect: DOMRect, width?: number) => {
  const widthDiff = typeof width === 'number' ? width - buttonRect.width : 0;

  switch (alignment) {
    case 'left':
      return buttonRect.left + window.scrollX;
    case 'center':
      return buttonRect.left + window.scrollX - widthDiff / 2;
    case 'right':
      return buttonRect.left + window.scrollX - widthDiff;
  }
};
