import { cva } from 'class-variance-authority';
import React, {
  type ReactNode,
  type CSSProperties,
  type FocusEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { clsxMerge, joinClassNames } from '../../utils';
import { DropdownTrigger, type DropdownTriggerProps } from './dropdown-trigger';
import { Portal } from '../portal';

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

export interface DropdownProps {
  /** Dropdown alignment. */
  alignment?: 'left' | 'center' | 'right';
  /** Custom className for the dropdown button. */
  triggerButtonProps: Omit<DropdownTriggerProps, 'isOpened' | 'onDropdownClose' | 'onDropdownOpen' | 'showDropdown'>;
  /** Custom className for the dropdown container. */
  containerClassName?: string;
  /** Custom className for the dropdown. */
  dropdownClassName?: string;
  /** If provided, dropdown will be rendered in an element with the given id. */
  dropdownPortalContainerId?: string;
  /** Dropdown content. */
  children: ReactNode;
  /** Dropdown width. */
  width?: number;
}

const getLeftPosition = (alignment: DropdownProps['alignment'], buttonRect: DOMRect, width?: number) => {
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

export function Dropdown({
  triggerButtonProps,
  containerClassName,
  dropdownClassName,
  dropdownPortalContainerId,
  children,
  width,
  alignment = 'center',
}: DropdownProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);
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
  }, [alignment, dropdownPortalContainerId, isOpened, width]);

  const handleDropdownOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  const handleDropdownClose = useCallback(() => {
    setShowDropdown(false);
  }, []);

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!buttonRef.current?.contains(e.relatedTarget) && !dropdownRef.current?.contains(e.relatedTarget)) {
      handleDropdownClose();
    }
  };

  return (
    <div
      className={clsxMerge('inline-flex w-full flex-col items-start gap-1.5', containerClassName)}
      onBlur={handleBlur}
    >
      <DropdownTrigger
        ref={buttonRef}
        isOpened={isOpened}
        showDropdown={showDropdown}
        onDropdownOpen={handleDropdownOpen}
        onDropdownClose={handleDropdownClose}
        {...triggerButtonProps}
      />
      <Portal container={dropdownPortalContainerId ? document.getElementById(dropdownPortalContainerId) : undefined}>
        <div
          ref={dropdownRef}
          className={clsxMerge(dropdownDropdownVariants({ isOpened: showDropdown }), dropdownClassName)}
          style={dropdownPosition}
          role='listbox'
        >
          {children}
        </div>
      </Portal>
    </div>
  );
}
