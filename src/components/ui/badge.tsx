import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground border-border",

        // 🎨 Enhanced status colors with better contrast
        backlog:
          "border-transparent bg-gray-100/80 text-gray-800 dark:bg-gray-800/50 dark:text-gray-200",
        todo: "border-transparent bg-blue-100/80 text-blue-800 dark:bg-blue-800/50 dark:text-blue-200",
        inprogress:
          "border-transparent bg-amber-100/80 text-amber-800 dark:bg-amber-800/50 dark:text-amber-200",
        inreview:
          "border-transparent bg-indigo-100/80 text-indigo-800 dark:bg-indigo-800/50 dark:text-indigo-200",
        done: "border-transparent bg-emerald-100/80 text-emerald-800 dark:bg-emerald-800/50 dark:text-emerald-200",

        // ✨ Optional additional variants
        blocked:
          "border-transparent bg-rose-100/80 text-rose-800 dark:bg-rose-800/50 dark:text-rose-200",
        onhold:
          "border-transparent bg-violet-100/80 text-violet-800 dark:bg-violet-800/50 dark:text-violet-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
