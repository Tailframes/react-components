import { cva } from 'class-variance-authority';
import { type HTMLAttributes, type ReactNode, useId } from 'react';
import { ChevronDownIcon } from '../../assets/chevron-down-icon';
import { clsxMerge } from '../../utils';
import { Button } from '../button';

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

interface AccordionItemVariants {
  /** @ignore */
  isExpanded: boolean;
}

export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Label of the item. */
  label: string;
  /** Adornment to the left of the label. */
  labelStartAdornment?: ReactNode;
  /** Content of the item. */
  content: ReactNode;
  /** Custom class for the content. */
  contentClassName?: string;
}

export function AccordionItem({
  label,
  labelStartAdornment,
  content,
  contentClassName,
  isExpanded,
  className,
  ...rest
}: AccordionItemProps & AccordionItemVariants) {
  const buttonId = useId();
  const contentId = useId();

  return (
    <div className={clsxMerge(accordionItemVariants({ isExpanded }), className)} {...rest}>
      <Button
        id={buttonId}
        variant='text-default'
        className={clsxMerge(
          'flex h-auto w-full items-center justify-between overflow-hidden whitespace-pre-wrap p-0 text-left leading-tight',
          {
            'pb-2 md:pb-1': isExpanded,
          }
        )}
        endAdornment={
          <div className='size-5'>
            <ChevronDownIcon
              className={clsxMerge('stroke-black transition-transform duration-300 ease-in-out', {
                'rotate-180': isExpanded,
              })}
            />
          </div>
        }
        aria-expanded={isExpanded}
        aria-controls={contentId}
      >
        <div className='flex w-full items-center justify-start gap-2'>
          {labelStartAdornment && (
            <div className='inline-flex size-5 items-center justify-start'>{labelStartAdornment}</div>
          )}
          <p className='w-full font-medium'>{label}</p>
        </div>
      </Button>
      <div
        id={contentId}
        role='region'
        aria-hidden={!isExpanded}
        aria-labelledby={buttonId}
        className={clsxMerge(
          'grid w-full grid-rows-[1fr] text-xs text-slate-600 opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out md:pr-7',
          contentClassName,
          {
            'pl-7': Boolean(labelStartAdornment),
            'grid-rows-[0fr] opacity-0': !isExpanded,
          }
        )}
      >
        <div className='overflow-hidden'>{content}</div>
      </div>
    </div>
  );
}

AccordionItem.displayName = 'AccordionItem';
