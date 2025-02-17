import { cn } from '@/utils/cnUtil';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { Slot } from './Slot';

export const buttonVariants = cva(
  'inline-flex gap-2 px-3 rounded-lg items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border-2 border-logo-200 bg-logo-200 text-white shadow-cogtec hover:bg-logo-200/90',
        outline: 'border-2 border-logo-200 bg-white shadow-cogtec hover:bg-logo-200 text-logo-200 hover:text-white',
        destructive: 'bg-warning text-white shadow-cogtec hover:bg-warning/90',
        ghost: 'hover:bg-beige-100 hover:text-black hover:shadow-cog-tec',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs py-4',
        lg: 'h-10 rounded-lg px-8 py-12',
        icon: 'size-9 p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
