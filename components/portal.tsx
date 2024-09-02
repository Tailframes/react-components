import { forwardRef, type HTMLAttributes, useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

interface PortalProps extends HTMLAttributes<HTMLDivElement> {
  container?: Element | null;
}

export const Portal = forwardRef<HTMLDivElement, PortalProps>((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  const container = containerProp ?? (mounted && globalThis?.document?.body);

  return container ? ReactDOM.createPortal(<div {...portalProps} ref={forwardedRef} />, container) : null;
});

Portal.displayName = 'Portal';
