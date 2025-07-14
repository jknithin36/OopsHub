import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { TaskStatus } from "../types";

interface UseGetTasksProps {
  workspaceId: string;
  projectId?: string | null;
  status?: TaskStatus | null;
  assigneeId?: string | null;
  dueDate?: string | null;
  search?: string | null;
}

export const useGetTasks = ({
  workspaceId,
  projectId,
  status,
  assigneeId,
  dueDate,
  search,
}: UseGetTasksProps) => {
  return useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      status,
      assigneeId,
      dueDate,
      search,
    ],
    queryFn: async () => {
      const query: Record<string, string> = { workspaceId };
      if (projectId) query.projectId = projectId;
      if (status) query.status = status;
      if (assigneeId) query.assigneeId = assigneeId;
      if (dueDate) query.dueDate = dueDate;
      if (search) query.search = search;

      const res = await client.api.tasks.$get({ query });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Failed to fetch tasks");
      }

      const { tasks } = await res.json();
      return tasks;
    },
    enabled: !!workspaceId && !!projectId,
  });
};
