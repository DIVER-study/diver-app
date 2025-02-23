import { cn } from '@/utils/cnUtil';
import { cva, VariantProps } from 'class-variance-authority';
import React from 'react';
import { Slot } from './Slot';

export const buttonVariants = cva(
  'flex gap-2.5 px-6 py-3 rounded-xl items-center justify-center text-xl h-fit font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-8 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'border-2 border-logo-200 bg-logo-200 text-white shadow-cogtec hover:bg-logo-200/90 disabled:bg-neutral-500 disabled:text-black',
        outline:
          'border-2 border-logo-200 bg-white shadow-cogtec hover:bg-logo-200 text-logo-200 hover:text-white disabled:border-neutral-600 disabled:bg-neutral-500 disabled:text-white',
        destructive: 'bg-warning text-white shadow-cogtec hover:bg-warning/90',
        ghost: 'hover:bg-beige-50 hover:text-black hover:shadow-cog-tec',
        board: 'border-2 border-transparent bg-white shadow-cogtec text-black hover:bg-logo-200/90 hover:text-white',
      },
      size: {
        default: '',
        sm: 'rounded-md px-3 text-base py-1',
        lg: 'text-3xl',
        icon: 'size-9 p-2',
      },
      theme: {
        default: '',
        behaviorism: 'hover:bg-behaviorism-100 hover:text-white text-behaviorism-100 border-behaviorism-100',
        gestalt: 'hover:bg-gestalt-100 hover:text-white text-gestalt-100 border-gestalt-100',
        tsc: 'hover:bg-tsc-100 hover:text-white text-tsc-100 border-tsc-100',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      theme: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, theme, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, theme }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
