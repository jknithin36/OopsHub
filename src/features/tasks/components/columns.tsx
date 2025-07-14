"use client";

import { ArrowUpDown, MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../types";
import { Button } from "@/components/ui/button";
import { MemberAvatar } from "@/components/member-avatar";
import { TaskDate } from "./task-date";
import { StatusBadge } from "./status-badge";
import { TaskActions } from "./task-action";

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Task Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <p className="line-clamp-1">{row.original.name}</p>,
  },

  {
    accessorKey: "assignee.name",
    header: "Assignee",
    cell: ({ row }) => {
      const assignee = row.original.assignee;
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <MemberAvatar
            className="size-6"
            fallbackClassName="text-xs"
            name={assignee?.name}
            src={assignee?.imageUrl || undefined}
          />
          <p className="line-clamp-1">{assignee?.name || "Unassigned"}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "project.name",
    header: "Project",
    cell: ({ row }) => {
      const project = row.original.project;
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <MemberAvatar
            className="size-6"
            fallbackClassName="text-xs"
            name={project?.name}
            src={project?.imageUrl || undefined}
          />
          <p className="line-clamp-1">{project?.name || "—"}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;
      if (!dueDate) return "—";
      return <TaskDate value={dueDate} className="text-sm" />;
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status} />;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.$id;
      const projectId = row.original.projectId;
      return (
        <TaskActions id={id} projectId={projectId}>
          <Button className="size-8 p-0" variant="ghost">
            <MoreVertical className="size-4" />
          </Button>
        </TaskActions>
      );
    },
  },
];
