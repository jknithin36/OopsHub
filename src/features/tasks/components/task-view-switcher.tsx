"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LayoutList, Columns3, CalendarDays, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useWorkSpaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useParams } from "next/navigation";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataKanban } from "./data-kanban";

const TaskViewSwitcher = () => {
  const { open } = useCreateTaskModal();
  const workspaceId = useWorkSpaceId();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectId = params?.projectId as string | undefined;

  const status = searchParams.get("status") ?? undefined;
  const assigneeId = searchParams.get("assigneeId") ?? undefined;
  const dueDate = searchParams.get("dueDate") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const updateSearchParam = (key: string, value: string | undefined) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (value) {
      current.set(key, value);
    } else {
      current.delete(key);
    }

    router.push(`?${current.toString()}`);
  };

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    status,
    assigneeId,
    dueDate,
    search,
  });

  return (
    <Tabs defaultValue="table" className="w-full space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
          {/* View Tabs */}
          <TabsList className="grid grid-cols-3 bg-muted/50 rounded-lg border shadow-sm">
            <TabsTrigger value="table">
              <LayoutList className="w-4 h-4 mr-2" />
              Table
            </TabsTrigger>
            <TabsTrigger value="kanban">
              <Columns3 className="w-4 h-4 mr-2" />
              Kanban
            </TabsTrigger>
            <TabsTrigger value="calendar">
              <CalendarDays className="w-4 h-4 mr-2" />
              Calendar
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="flex gap-3">
            <Select
              value={status}
              onValueChange={(val) => updateSearchParam("status", val)}
            >
              <SelectTrigger className="w-[140px] h-9 text-sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BACKLOG">Backlog</SelectItem>
                <SelectItem value="TODO">To Do</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="IN_REVIEW">In Review</SelectItem>
                <SelectItem value="DONE">Done</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={assigneeId}
              onValueChange={(val) => updateSearchParam("assigneeId", val)}
            >
              <SelectTrigger className="w-[140px] h-9 text-sm">
                <SelectValue placeholder="Filter by assignee" />
              </SelectTrigger>
              <SelectContent>
                {/* Fill these dynamically if needed */}
                <SelectItem value="user1">User 1</SelectItem>
                <SelectItem value="user2">User 2</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={dueDate}
              onValueChange={(val) => updateSearchParam("dueDate", val)}
            >
              <SelectTrigger className="w-[140px] h-9 text-sm">
                <SelectValue placeholder="Filter by due date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025-07-15">Jul 15</SelectItem>
                <SelectItem value="2025-07-20">Jul 20</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Create Task Button */}
        <Button className="h-9" onClick={open}>
          <PlusIcon className="w-4 h-4 mr-2" />
          New Task
        </Button>
      </div>

      {/* Tab Views */}
      <TabsContent value="table">
        {isLoadingTasks ? (
          <div className="text-sm text-muted-foreground">Loading tasks...</div>
        ) : (
          <div className="border rounded-lg p-4 text-sm text-muted-foreground">
            <DataTable columns={columns} data={tasks ?? []} />
          </div>
        )}
      </TabsContent>

      <TabsContent value="kanban">
        <div className="border rounded-lg p-4 text-sm text-muted-foreground">
          <DataKanban data={tasks ?? []} />
        </div>
      </TabsContent>

      <TabsContent value="calendar">
        <div className="border rounded-lg p-4 text-sm text-muted-foreground">
          Calendar View
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TaskViewSwitcher;
