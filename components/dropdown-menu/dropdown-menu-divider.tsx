import { clsxMerge } from '../../utils';
import { Divider, type DividerProps } from '../divider';

interface DropdownMenuDividerProps extends DividerProps {}

export function DropdownMenuDivider({ className, ...rest }: DropdownMenuDividerProps) {
  return <Divider direction='horizontal' className={clsxMerge('m-0', className)} {...rest} />;
}

DropdownMenuDivider.displayName = 'DropdownMenuDivider';
