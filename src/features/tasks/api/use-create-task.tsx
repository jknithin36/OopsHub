import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

interface CreateTaskInput {
  name: string;
  status: string;
  workspaceId: string;
  projectId: string;
  assigneeId?: string;
  dueDate?: string;
  description?: string;
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData: CreateTaskInput) => {
      const response = await client.api.tasks.$post({
        json: taskData,
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody?.error || "Failed to create task");
      }

      const { data } = await response.json();
      return data;
    },
    onSuccess: (_data, variables) => {
      // ✅ Invalidate project-specific task query to refresh the board
      queryClient.invalidateQueries({
        queryKey: ["tasks", variables.workspaceId, variables.projectId],
      });
    },
    onError: (error) => {
      console.error("❌ Task creation failed:", error);
    },
  });
};
