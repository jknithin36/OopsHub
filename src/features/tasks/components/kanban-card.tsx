"use client";

import { MoreHorizontal } from "lucide-react";
import { Task } from "../types";
import { TaskActions } from "./task-action";
import { DottedSeparator } from "@/components/dotted-seperator";
import { MemberAvatar } from "@/components/member-avatar";
import { getImageUrl } from "@/lib/utils";
import { format } from "date-fns";

interface KanbanCardProps {
  task: Task;
}

export const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="bg-white dark:bg-neutral-900 p-2.5 mb-1.5 rounded shadow-sm space-y-3 border">
      {/* Title and action */}
      <div className="flex items-start justify-between gap-x-2">
        <p className="text-sm font-medium text-foreground">{task.name}</p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer" />
        </TaskActions>
      </div>

      <DottedSeparator />

      {/* Project + Due Date */}
      <div className="flex justify-between items-center">
        {task.project?.image && (
          <img
            src={getImageUrl(task.project.image)}
            alt="project"
            className="h-5 w-5 rounded-sm object-cover"
          />
        )}
        {task.dueDate && (
          <span className="text-[11px] text-muted-foreground ml-auto">
            {format(new Date(task.dueDate), "MMM d")}
          </span>
        )}
      </div>

      {/* Assigned User */}
      <div className="pt-1">
        {task.assignee && <MemberAvatar name={task.assignee.name} />}
      </div>
    </div>
  );
};
