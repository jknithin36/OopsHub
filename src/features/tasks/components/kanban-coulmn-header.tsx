"use client";

import { TaskStatus } from "../types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusColors = {
  [TaskStatus.BACKLOG]: "bg-neutral-200 dark:bg-neutral-700",
  [TaskStatus.TODO]: "bg-blue-200 dark:bg-blue-900",
  [TaskStatus.IN_PROGRESS]: "bg-amber-200 dark:bg-amber-900",
  [TaskStatus.IN_REVIEW]: "bg-purple-200 dark:bg-purple-900",
  [TaskStatus.DONE]: "bg-green-200 dark:bg-green-900",
};

const statusLabels = {
  [TaskStatus.BACKLOG]: "Backlog",
  [TaskStatus.TODO]: "To Do",
  [TaskStatus.IN_PROGRESS]: "In Progress",
  [TaskStatus.IN_REVIEW]: "In Review",
  [TaskStatus.DONE]: "Done",
};

interface KanbanColumnHeaderProps {
  board: TaskStatus;
  taskCount: number;
  className?: string;
}

export const KanbanColumnHeader = ({
  board,
  taskCount,
  className,
}: KanbanColumnHeaderProps) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-2">
        <div className={cn("w-3 h-3 rounded-full", statusColors[board])} />
        <h3 className="font-medium text-sm">{statusLabels[board]}</h3>
      </div>
      <Badge variant="secondary" className="px-2 py-0.5 text-xs">
        {taskCount}
      </Badge>
    </div>
  );
};
