import React from 'react';
import { clsxMerge, joinClassNames } from '../../utils';
import { Button, type ButtonProps } from '../button';

export interface DropdownItemProps extends ButtonProps {}

export function DropdownItem({ className, children, ...rest }: DropdownItemProps) {
  return (
    <Button
      variant='text-default'
      size='small'
      fullWidth
      className={clsxMerge(
        joinClassNames(
          'justify-start stroke-slate-700 text-sm font-normal text-slate-700 transition-colors duration-300 ease-in-out',
          'hover:bg-blue-50 hover:text-blue-700'
        ),
        className
      )}
      contentClassName='flex flex-1'
      {...rest}
    >
      {children}
    </Button>
  );
}

DropdownItem.displayName = 'DropdownItem';
