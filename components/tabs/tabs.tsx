import { clsxMerge, kebabCase } from '../../utils';
import { type ReactNode, useCallback, useState } from 'react';
import { Tab, type TabProps as SingleTabProps } from './tab';

type TabProps = Pick<SingleTabProps, 'value' | 'label' | 'badge' | 'startAdornment' | 'disabled'>;

export interface TabsProps {
  /** Tabs to display. */
  items: (TabProps & { content: ReactNode })[];
  /** Custom class for the component. */
  className?: string;
}

export function Tabs({ className, items }: TabsProps) {
  const [activeTab, setActiveTab] = useState(items[0].value);

  const handleTabClick = useCallback((value: TabProps['value']) => {
    setActiveTab(value);
  }, []);

  return (
    <div className='w-full'>
      <div className={clsxMerge('mb-4 border-b border-gray-200', className)}>
        <ul className='-mb-px flex space-x-6 overflow-auto text-center text-sm font-medium' role='tablist'>
          {items.map(({ content: _, ...props }, index) => (
            <Tab key={index} isActive={props.value === activeTab} onClick={handleTabClick} {...props} />
          ))}
        </ul>
      </div>
      <div>
        {items.map(({ value, content }, index) => (
          <div key={index} id={kebabCase(`tab-panel-${index}`)} className={clsxMerge({ hidden: value !== activeTab })}>
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}

Tabs.displayName = 'Tabs';
