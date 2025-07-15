"use client";

import { ArrowUpDown, MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../types";
import { Button } from "@/components/ui/button";
import { MemberAvatar } from "@/components/member-avatar";
import { TaskDate } from "./task-date";
import { StatusBadge } from "./status-badge";
import { TaskActions } from "./task-action";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-muted/50 px-3"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <span className="font-medium">Task Name</span>
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium line-clamp-1">{row.original.name}</span>
        {row.original.priority && (
          <Badge
            variant="outline"
            className="border-transparent bg-muted text-muted-foreground"
          >
            {row.original.priority}
          </Badge>
        )}
      </div>
    ),
    size: 300,
  },
  {
    accessorKey: "assignee.name",
    header: "Assignee",
    cell: ({ row }) => {
      const assignee = row.original.assignee;
      return (
        <div className="flex items-center gap-x-2">
          <MemberAvatar
            className="size-6"
            fallbackClassName="text-xs"
            name={assignee?.name}
            src={assignee?.imageUrl || undefined}
          />
          <span className="text-sm line-clamp-1">
            {assignee?.name || (
              <span className="text-muted-foreground">Unassigned</span>
            )}
          </span>
        </div>
      );
    },
    size: 180,
  },
  {
    accessorKey: "project.name",
    header: "Project",
    cell: ({ row }) => {
      const project = row.original.project;
      return (
        <div className="flex items-center gap-x-2">
          <MemberAvatar
            className="size-6"
            fallbackClassName="text-xs"
            name={project?.name}
            src={project?.imageUrl || undefined}
          />
          <span className="text-sm line-clamp-1">
            {project?.name || <span className="text-muted-foreground">—</span>}
          </span>
        </div>
      );
    },
    size: 180,
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      if (!dueDate) return <span className="text-muted-foreground">—</span>;
      return <TaskDate value={dueDate} className="text-sm" />;
    },
    size: 150,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status} />;
    },
    size: 150,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.$id;
      const projectId = row.original.projectId;
      return (
        <div className="flex justify-end">
          <TaskActions id={id} projectId={projectId}>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 hover:bg-muted/50 text-muted-foreground"
            >
              <MoreVertical className="size-4" />
            </Button>
          </TaskActions>
        </div>
      );
    },
    size: 50,
  },
];
