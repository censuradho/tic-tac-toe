import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createWrapperAndAppendToBody } from 'utils/helpers';

interface ReactPortalProps {
  children: ReactNode;
  wrapperId: string | number
}

function ReactPortal({ children, wrapperId }: ReactPortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
  const id = String(wrapperId)
  const element = document.getElementById(id) || createWrapperAndAppendToBody(wrapperId);

    setWrapperElement(element);

    return () => {
      if (element.parentNode) element.parentNode.removeChild(element)
    };

  }, [wrapperId]);


  if (!wrapperElement) return null

  return createPortal(children, wrapperElement);
}

export default ReactPortal;