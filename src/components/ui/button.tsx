import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-offset-2",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-offset-2",
        outline:
          "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 active:bg-gray-200",
        secondary:
          "bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300",
        ghost:
          "bg-transparent text-gray-600 hover:bg-gray-100 active:bg-gray-200",
        muted: "bg-gray-50 text-gray-500 hover:bg-gray-100 active:bg-gray-200",
        tertiary:
          "bg-white text-blue-600 border border-transparent hover:bg-blue-50 active:bg-blue-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3",
        xs: "h-7 rounded-md px-2 text-xs",
        lg: "h-12 rounded-md px-8",
        icon: "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
