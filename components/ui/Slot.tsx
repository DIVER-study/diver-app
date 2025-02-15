import { cn } from '@/utils/cnUtil';
import { Children, cloneElement, isValidElement } from 'react';

export const Slot = ({ children, className }: React.HTMLAttributes<HTMLElement>) => {
  const child = Children.only(children);

  if (!isValidElement(child)) {
    console.error('Slot component expects a single valid React Element as a child');
    return null;
  }

  const validChild = child as React.ReactElement<HTMLElement>;

  const combinedClassNames = cn(validChild.props.className, className);

  return cloneElement(validChild, {
    ...validChild.props,
    className: combinedClassNames,
  });
};
