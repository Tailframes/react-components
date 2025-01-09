import { clsxMerge } from '../../utils';
import { type HTMLAttributes, useState, type MouseEvent } from 'react';
import { AccordionItem, type AccordionItemProps } from './accordion-item';

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  /** Items to display in the accordion. */
  items: AccordionItemProps[];
  /** Whether to allow multiple items to be expanded at the same time. */
  type?: 'single' | 'multiple';
}

export function Accordion({ items, type = 'multiple', className, ...rest }: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleItemClick =
    ({ label, onClick }: Pick<AccordionItemProps, 'label' | 'onClick'>) =>
    (event: MouseEvent<HTMLDivElement>) => {
      if (type === 'single') {
        if (expandedItems.includes(label)) {
          setExpandedItems([]);
        } else {
          setExpandedItems([label]);
        }
      } else if (type === 'multiple') {
        if (expandedItems.includes(label)) {
          setExpandedItems(expandedItems.filter(item => item !== label));
        } else {
          setExpandedItems([...expandedItems, label]);
        }
      }

      onClick?.(event);
    };

  return (
    <div className={clsxMerge('flex w-full flex-col gap-4 overflow-hidden', className)} {...rest}>
      {(items || []).map(item => (
        <AccordionItem
          key={item.label}
          onClick={handleItemClick(item)}
          isExpanded={expandedItems.includes(item.label)}
          {...item}
        />
      ))}
    </div>
  );
}

Accordion.displayName = 'Accordion';

export default Accordion;
