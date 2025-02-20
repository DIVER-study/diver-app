'use client';

import { cn } from '@/utils/cnUtil';
import { buttonVariants } from './Button';
import { Slot } from './Slot';

type DefaultProps = React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>;

export const AlertBox = ({ className, children, ...props }: DefaultProps) => (
  <div
    className='absolute left-0 top-0 w-full h-[100dvh] bg-black/40 starting:open:opacity-0 open:opacity-100'
    {...props}
  >
    <AlertBoxOverlay className={className}>{children}</AlertBoxOverlay>
  </div>
);

const AlertBoxOverlay = ({ className, ...props }: DefaultProps) => (
  <div
    className={cn(
      'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-fit bg-logo-100 rounded-4xl py-10 px-18 shadow-cogtec flex-col justify-between gap-8 items-center flex',
      className
    )}
    {...props}
  />
);

export const AlertBoxHeader = ({ className, children, ...props }: DefaultProps) => (
  <div
    className={cn('self-stretch flex flex-col gap-5 text-center sm:text-left', className)}
    {...props}
  >
    {children}
  </div>
);

export const AlertBoxFooter = ({ className, children, ...props }: DefaultProps) => (
  <div
    className={cn('self-stretch sm:justify-between items-center flex flex-col-reverse sm:flex-row', className)}
    {...props}
  >
    {children}
  </div>
);

export const AlertBoxTitle = ({ className, ...props }: DefaultProps) => (
  <div
    className={cn('self-stretch text-3xl font-bold', className)}
    {...props}
  />
);

export const AlertBoxDescription = ({ className, ...props }: DefaultProps) => (
  <div
    className={cn('text-normal text-2xl lg:max-w-150 max-w-70 text-wrap', className)}
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
