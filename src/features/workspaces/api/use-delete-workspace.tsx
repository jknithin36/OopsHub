import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteWorkspace = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workspaceId: string) => {
      const res = await fetch(`/api/workspaces/${workspaceId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error || "Failed to delete workspace");

      return data;
    },

    onSuccess: (data) => {
      toast.success("Workspace deleted!");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },

    onError: (error) => {
      toast.error(error.message || "Deletion failed.");
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
};
