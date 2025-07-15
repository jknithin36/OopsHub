"use client";

import { MoreHorizontal, Flag, Clock, Tag, Circle } from "lucide-react";
import { Task, TaskStatus } from "../types";
import { TaskActions } from "./task-action";
import { getImageUrl } from "@/lib/utils";
import { format } from "date-fns";

const priorityColors = {
  High: "bg-red-100 text-red-800 border-red-200",
  Medium: "bg-amber-100 text-amber-800 border-amber-200",
  Low: "bg-blue-100 text-blue-800 border-blue-200",
};

const statusColors = {
  [TaskStatus.BACKLOG]: "bg-purple-50 border-purple-100",
  [TaskStatus.TODO]: "bg-blue-50 border-blue-100",
  [TaskStatus.IN_PROGRESS]: "bg-amber-50 border-amber-100",
  [TaskStatus.IN_REVIEW]: "bg-pink-50 border-pink-100",
  [TaskStatus.DONE]: "bg-green-50 border-green-100",
};

interface KanbanCardProps {
  task: Task;
  status: TaskStatus;
}

export const KanbanCard = ({ task, status }: KanbanCardProps) => {
  return (
    <div
      className={`group p-3 mb-2 rounded-xl shadow-sm space-y-2 border-2 ${statusColors[status]} hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5`}
    >
      {/* Colorful status indicator */}
      <div className="flex items-center gap-2 mb-1">
        <Circle
          className={`size-3 ${
            status === TaskStatus.BACKLOG
              ? "text-purple-500"
              : status === TaskStatus.TODO
              ? "text-blue-500"
              : status === TaskStatus.IN_PROGRESS
              ? "text-amber-500"
              : status === TaskStatus.IN_REVIEW
              ? "text-pink-500"
              : "text-green-500"
          }`}
        />
        <span className="text-xs font-medium text-neutral-600">
          {status.replace("_", " ")}
        </span>
      </div>

      {/* Title */}
      <p className="text-sm font-semibold text-neutral-800 line-clamp-2">
        {task.name}
      </p>

      {/* Colorful badges */}
      <div className="flex flex-wrap gap-1.5">
        {task.priority && (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium border ${
              priorityColors[task.priority]
            } flex items-center gap-1`}
          >
            <Flag className="size-3" />
            {task.priority}
          </span>
        )}

        {task.labels?.map((label) => (
          <span
            key={label}
            className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium border border-indigo-200 flex items-center gap-1"
          >
            <Tag className="size-3" />
            {label}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-1.5">
          {task.dueDate && (
            <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800 text-xs font-medium border border-neutral-200 flex items-center gap-1">
              <Clock className="size-3" />
              {format(new Date(task.dueDate), "MMM d")}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {task.assignee && (
            <div className="flex items-center">
              <span className="text-xs text-neutral-600 mr-1.5">
                {task.assignee.name.split(" ")[0]}
              </span>
              <div className="size-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                {task.assignee.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          <TaskActions id={task.$id} projectId={task.projectId}>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-neutral-600">
              <MoreHorizontal className="size-4" />
            </button>
          </TaskActions>
        </div>
      </div>
    </div>
  );
};
