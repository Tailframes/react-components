import { clsxMerge } from '../../utils';
import { Divider, type DividerProps } from '../divider';

interface DropdownDividerProps extends DividerProps {}

export function DropdownDivider({ className, ...rest }: DropdownDividerProps) {
  return <Divider direction='horizontal' className={clsxMerge('m-0', className)} {...rest} />;
}

DropdownDivider.displayName = 'DropdownDivider';
