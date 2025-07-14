import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskStatus } from "../types";
import { toast } from "sonner";

interface UpdatePayload {
  $id: string;
  status: TaskStatus;
  position: number;
}

export const useUpdateManyTasks = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: UpdatePayload[]) => {
      const res = await fetch("/api/tasks/bulk-update", {
        method: "POST", // ✅ Must be POST (not PATCH)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updates }), // ✅ Must be "updates", not "tasks"
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Failed to update tasks");
      }

      return res.json();
    },
    onSuccess: () => {
      toast.success("Tasks updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong while updating tasks");
    },
  });
};
