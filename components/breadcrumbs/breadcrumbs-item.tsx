import { type ReactNode } from 'react';
import { clsxMerge } from '../../utils';

export interface BreadcrumbsItemProps {
  /** The label of the item. */
  label?: string;
  /** The start icon of the item. */
  icon?: ReactNode;
  /** The href of the item. */
  href: string;
  /** @ignore */
  isLast?: boolean;
}

export function BreadcrumbsItem({ label, icon, href, isLast }: BreadcrumbsItemProps) {
  return (
    <li className='inline-flex items-center' aria-current={isLast ? 'page' : undefined}>
      <a
        href={href}
        className={clsxMerge(
          'inline-flex cursor-pointer items-center gap-1.5 stroke-slate-400 text-xs leading-none transition-colors duration-300 ease-in-out hover:text-blue-700',
          {
            'font-medium text-black': isLast,
            'font-normal text-slate-500': !isLast,
          }
        )}
      >
        {icon}
        {label}
      </a>
    </li>
  );
}

BreadcrumbsItem.displayName = 'BreadcrumbsItem';
