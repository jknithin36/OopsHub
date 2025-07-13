"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = {
  $id: string;
  name: string;
  imgUrl?: string | null;
  workspaceId: string;
};

type RequestType = {
  formData: FormData;
};

export const useUpdateProject = (projectId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ formData }) => {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        body: formData,
      });

      let result;
      try {
        result = await res.json();
      } catch (err) {
        throw new Error("Invalid JSON response from server");
      }

      if (!res.ok) {
        throw new Error(
          result?.error?.issues?.[0]?.message ||
            result?.error?.message ||
            result?.error ||
            "Project update failed"
        );
      }

      return result.data as ResponseType;
    },

    onSuccess: (updatedProject) => {
      toast.success("Project updated!");
      queryClient.invalidateQueries({
        queryKey: ["projects", updatedProject.workspaceId],
      });

      router.push(
        `/workspaces/${updatedProject.workspaceId}/projects/${updatedProject.$id}`
      );
    },

    onError: (error) => {
      toast.error(error.message || "Update failed.");
    },
  });
};
