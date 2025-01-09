import { createContext, type ReactNode, useCallback, useState } from 'react';
import { clsxMerge } from '../utils';

export interface DialogProps {
  visible?: boolean;
  content?: ReactNode | null;
  containerClassName?: string;
  contentClassName?: string;
}

export const Dialog = ({ visible, content, containerClassName, contentClassName }: DialogProps) => (
  <div
    id='dialog'
    role='dialog'
    aria-modal='true'
    className={clsxMerge(
      'fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-20 transition-all duration-500 ease-in-out md:backdrop-blur-sm',
      { 'translate-y-full opacity-0 md:invisible md:translate-y-0': !visible },
      containerClassName
    )}
  >
    <div className={clsxMerge('relative h-screen md:h-auto md:max-h-[90vh] md:max-w-4xl', contentClassName)}>
      {content}
    </div>
  </div>
);

Dialog.displayName = 'Dialog';

// DialogProvider

export interface DialogContextProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  content: ReactNode;
  setContent: (content: ReactNode) => void;
}

export const DialogContext = createContext<DialogContextProps | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const handleSetContent = useCallback((content: ReactNode) => {
    setContent(content);
    setVisible(!!content);
  }, []);

  const handleSetVisible = useCallback((visible: boolean) => {
    setVisible(visible);
    if (!visible) {
      setContent(null);
    }
  }, []);

  return (
    <DialogContext.Provider value={{ content, visible, setContent: handleSetContent, setVisible: handleSetVisible }}>
      {children}
      <Dialog visible={visible} content={content} />
    </DialogContext.Provider>
  );
}
