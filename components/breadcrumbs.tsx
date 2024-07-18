import { Fragment, type ReactNode, useState } from 'react';
import { ChevronIcon } from '../assets/chevron-icon';
import { MoreHorizontalIcon } from '../assets/more-horizontal-icon';
import { clsxMerge } from '../utils';
import { Button } from './button';

export interface BreadcrumbsProps {
  items: BreadcrumbItemProps[];
  separator?: 'chevron' | 'slash' | ReactNode;
  maxItems?: number;
}

export function Breadcrumbs({ items, separator = 'chevron', maxItems = 6 }: BreadcrumbsProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const isMaxItemsLimitExceeded = maxItems > 0 && items.length > maxItems;
  const itemsBeforeThreshold = Math.floor(maxItems / 2);
  const itemsAfterThreshold = items.length - Math.ceil(maxItems / 2);

  const itemsBefore = isMaxItemsLimitExceeded ? items.slice(0, itemsBeforeThreshold) : [];
  const hiddenItems = isMaxItemsLimitExceeded ? items.slice(itemsBeforeThreshold, itemsAfterThreshold) : [];
  const itemsAfter = isMaxItemsLimitExceeded ? items.slice(itemsAfterThreshold, items.length) : items;

  return (
    <nav aria-label='Breadcrumbs'>
      <ol className='inline-flex items-center gap-1.5'>
        {itemsBefore.map((props, index) => (
          <Fragment key={props.label ?? index}>
            <BreadcrumbsItem {...props} />
            <BreadcrumbSeparator separator={separator} />
          </Fragment>
        ))}

        {isCollapsed && hiddenItems.length > 0 && (
          <>
            <li className='flex items-center'>
              <Button
                size='small'
                variant='text-default'
                className='h-auto min-w-0 stroke-inherit p-0 text-slate-400 hover:text-blue-700'
                onClick={isCollapsed => {
                  setIsCollapsed(!isCollapsed);
                }}
              >
                <MoreHorizontalIcon />
                <span className='sr-only'>Show more</span>
              </Button>
            </li>
            {itemsAfter.length > 0 && <BreadcrumbSeparator separator={separator} />}
          </>
        )}
        {!isCollapsed &&
          hiddenItems.map((props, index) => (
            <Fragment key={props.label ?? index}>
              <BreadcrumbsItem {...props} />
              <BreadcrumbSeparator separator={separator} />
            </Fragment>
          ))}

        {itemsAfter.map((props, index) => {
          const isLast = index === itemsAfter.length - 1;

          return (
            <Fragment key={props.label ?? index}>
              <BreadcrumbsItem isLast={isLast} {...props} />
              {!isLast && <BreadcrumbSeparator separator={separator} />}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

Breadcrumbs.displayName = 'Breadcrumbs';

const DefaultSeparator: Record<string, ReactNode> = {
  chevron: <ChevronIcon className='size-3 -rotate-90 stroke-slate-400 ' />,
  slash: '/',
};

const BreadcrumbSeparator = ({ separator }: Pick<BreadcrumbsProps, 'separator'>) => {
  return (
    <li role='presentation' aria-hidden className='inline-flex items-center text-slate-400'>
      {DefaultSeparator[separator?.toString() ?? 'chevron'] ?? separator}
    </li>
  );
};

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export interface BreadcrumbItemProps {
  label?: string;
  icon?: ReactNode;
  href: string;
  isLast?: boolean;
}

function BreadcrumbsItem({ label, icon, href, isLast }: BreadcrumbItemProps) {
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
