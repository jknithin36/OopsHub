import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProject = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(
          data?.error?.issues?.[0]?.message || "Failed to create project"
        );

      return data;
    },

    onSuccess: (data) => {
      toast.success("Project created!");
      queryClient.invalidateQueries({
        queryKey: ["projects", data.data.workspaceId],
      });

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create project.");
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
};
