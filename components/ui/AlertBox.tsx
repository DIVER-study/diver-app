'use client';

import { cn } from '@/utils/cnUtil';
import { buttonVariants } from './Button';
import { Slot } from './Slot';

export const AlertBoxOverlay = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-fit bg-logo-100 rounded-lg py-8 px-6 shadow-xl',
      className
    )}
    {...props}
  >
    <div className='flex flex-col gap-2'>{children}</div>
  </div>
);

export const AlertBoxHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
    {...props}
  >
    {children}
  </div>
);

export const AlertBoxFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  >
    {children}
  </div>
);

export const AlertBoxTitle = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
);

export const AlertBoxDescription = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('text-sm max-w-100 text-wrap', className)}
    {...props}
  />
);

export const AlertBoxAction = ({
  className,
  asChild,
  ...props
}: React.HTMLAttributes<HTMLElement> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants(), className)}
      {...props}
    />
  );
};

export const AlertBoxCancel = ({
  className,
  asChild,
  ...props
}: React.HTMLAttributes<HTMLElement> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  );
};
