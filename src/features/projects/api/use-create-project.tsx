import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ProjectResponse = {
  $id: string;
  name: string;
  workspaceId: string;
  imgUrl?: string | null;
};

export const useCreateProject = (options?: {
  onSuccess?: (project: ProjectResponse) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ProjectResponse, Error, FormData>({
    mutationFn: async (formData) => {
      const res = await fetch("/api/projects", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result?.error?.issues?.[0]?.message ||
            result?.error?.message ||
            "Failed to create project"
        );
      }

      return result.data as ProjectResponse;
    },

    onSuccess: (project) => {
      toast.success("Project created!");

      // ✅ Invalidate project list for that workspace
      queryClient.invalidateQueries({
        queryKey: ["projects", project.workspaceId],
      });

      // ✅ Redirect to new project's page
      router.push(`/workspaces/${project.workspaceId}/projects/${project.$id}`);

      // ✅ Custom callback if needed
      options?.onSuccess?.(project);
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create project.");
      options?.onError?.(error);
    },
  });
};
