import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from 'utils';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:bg-slate-gray-200 disabled:border-slate-gray-200 disabled:text-slate-700 disabled:cursor-not-allowed',
  ),
  {
    variants: {
      variant: {
        default: 'text-white bg-primary hover:bg-secondary',
        secondary:
          'text-slate-gray-800 bg-white border border-slate-gray-800 hover:border-primary hover:text-primary',
      },
      size: {
        default: 'px-5 py-3',
        sm: 'py-2 px-3',
        lg: 'px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export { Button, buttonVariants };
