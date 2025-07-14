import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";
import { Task } from "../types";

export const useGetTaskById = (taskId: string) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const res = await client.api.tasks[":taskId"].$get({ param: { taskId } });
      if (!res.ok) throw new Error("Failed to fetch task");
      const { task } = await res.json();
      return task as Task;
    },
    enabled: !!taskId,
  });
};
