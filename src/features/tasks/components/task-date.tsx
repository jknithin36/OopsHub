"use client";

import { differenceInDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskDateProps {
  value: string | Date;
  className?: string;
}

export const TaskDate = ({ value, className = "" }: TaskDateProps) => {
  const today = new Date();
  const endDate = new Date(value);
  const diffInDays = differenceInDays(endDate, today);

  // Determine styling based on days remaining
  let containerClasses =
    "inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-medium";
  let icon = null;
  let tooltipText = "";

  if (isNaN(diffInDays)) {
    // Invalid date
    containerClasses = "text-muted-foreground";
    tooltipText = "Invalid date";
  } else if (diffInDays < 0) {
    // Overdue
    containerClasses +=
      " bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300";
    icon = <span className="size-1.5 rounded-full bg-red-500" />;
    tooltipText = `Overdue by ${Math.abs(diffInDays)} day${
      Math.abs(diffInDays) !== 1 ? "s" : ""
    }`;
  } else if (diffInDays === 0) {
    // Due today
    containerClasses +=
      " bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300";
    icon = <span className="size-1.5 rounded-full bg-orange-500" />;
    tooltipText = "Due today";
  } else if (diffInDays <= 1) {
    // Due tomorrow
    containerClasses +=
      " bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300";
    icon = <span className="size-1.5 rounded-full bg-amber-500" />;
    tooltipText = "Due tomorrow";
  } else if (diffInDays <= 3) {
    // Due in 2-3 days
    containerClasses +=
      " bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300";
    icon = <span className="size-1.5 rounded-full bg-yellow-500" />;
    tooltipText = `Due in ${diffInDays} days`;
  } else if (diffInDays <= 7) {
    // Due in 4-7 days
    containerClasses +=
      " bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300";
    icon = <span className="size-1.5 rounded-full bg-blue-500" />;
    tooltipText = `Due in ${diffInDays} days`;
  } else if (diffInDays <= 14) {
    // Due in 8-14 days
    containerClasses +=
      " bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300";
    icon = <span className="size-1.5 rounded-full bg-green-500" />;
    tooltipText = `Due in ${diffInDays} days`;
  } else {
    // Due in more than 14 days
    containerClasses += " bg-muted text-muted-foreground";
    icon = <span className="size-1.5 rounded-full bg-muted-foreground" />;
    tooltipText = `Due in ${diffInDays} days`;
  }

  const formattedDate = format(endDate, "MMM d, yyyy");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={cn(containerClasses, className)}>
          {icon}
          <span>{formattedDate}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" align="center">
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  );
};
