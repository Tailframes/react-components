import { ChevronDownIcon } from '../assets/chevron-down-icon';
import { clsxMerge } from '../utils';
import { type HTMLAttributes, type ReactNode, useState, type MouseEvent, useId } from 'react';
import { cva } from 'class-variance-authority';
import { Button } from './button';

const accordionItemVariants = cva(
  'flex flex-col items-start justify-start rounded-lg border border-slate-200 bg-white p-3 hover:cursor-pointer hover:bg-gray-50',
  {
    variants: {
      isExpanded: {
        true: 'bg-gray-50',
        false: '',
      },
    },
  }
);

export interface AccordionVariants {
  isExpanded: boolean;
}

interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'>, AccordionVariants {
  label: string;
  labelStartIcon?: ReactNode;
  content: ReactNode;
  contentClassName?: string;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  items: Array<Omit<AccordionItemProps, 'isExpanded'>>;
  type?: 'single' | 'multiple';
}

function AccordionItem({
  label,
  labelStartIcon,
  content,
  contentClassName,
  isExpanded,
  className,
  ...rest
}: AccordionItemProps) {
  const buttonId = useId();
  const contentId = useId();

  return (
    <div className={clsxMerge(accordionItemVariants({ isExpanded }), className)} {...rest}>
      <Button
        id={buttonId}
        variant='text-default'
        className={clsxMerge('flex h-auto w-full items-center justify-between p-0', { 'pb-1': isExpanded })}
        endIcon={
          <ChevronDownIcon
            className={clsxMerge('size-5 stroke-black transition-transform duration-300 ease-in-out', {
              'rotate-180': isExpanded,
            })}
          />
        }
        aria-expanded={isExpanded}
        aria-controls={contentId}
      >
        <div className='flex w-full items-center justify-start gap-2'>
          {labelStartIcon && (
            <div className='inline-flex size-5 items-center justify-start overflow-hidden'>{labelStartIcon}</div>
          )}
          <p className='font-medium'>{label}</p>
        </div>
      </Button>
      <div
        id={contentId}
        role='region'
        aria-hidden={!isExpanded}
        aria-labelledby={buttonId}
        className={clsxMerge(
          'grid w-full grid-rows-[1fr] pr-7 text-xs text-slate-600 opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out',
          contentClassName,
          {
            'pl-7': Boolean(labelStartIcon),
            'grid-rows-[0fr] opacity-0': !isExpanded,
          }
        )}
      >
        <div className='overflow-hidden'>{content}</div>
      </div>
    </div>
  );
}

export function Accordion({ children, items = [], type = 'multiple', className, ...rest }: AccordionProps) {
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
    <div className={clsxMerge('flex flex-col gap-4', className)} {...rest}>
      {items.map(item => (
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
