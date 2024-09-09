import { Fragment, type ReactNode, useState } from 'react';
import { ChevronIcon } from '../../assets/chevron-icon';
import { MoreHorizontalIcon } from '../../assets/more-horizontal-icon';
import { Button } from '../button';
import { BreadcrumbsItem, type BreadcrumbsItemProps } from './breadcrumbs-item';

export interface BreadcrumbsProps {
  /** Items to display in the breadcrumbs. */
  items: BreadcrumbsItemProps[];
  /** Separator to use between items, can be a predefined string (`chevron`, `slash`) or a custom React node. */
  separator?: 'chevron' | 'slash' | ReactNode;
  /** Maximum number of items to display without collapsing. */
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
  chevron: <ChevronIcon className='size-3 -rotate-90 stroke-slate-400' />,
  slash: '/',
};

function BreadcrumbSeparator({ separator }: Pick<BreadcrumbsProps, 'separator'>) {
  return (
    <li role='presentation' aria-hidden className='inline-flex items-center text-slate-400'>
      {DefaultSeparator[separator?.toString() ?? 'chevron'] ?? separator}
    </li>
  );
}

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
