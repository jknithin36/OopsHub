"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = {
  $id: string;
  name: string;
  imageUrl?: string | null;
  userId: string;
  inviteCode?: string;
};

type RequestType = {
  formData: FormData;
};

export const useUpdateWorkspace = (workspaceId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ formData }) => {
      const res = await fetch(`/api/workspaces/${workspaceId}`, {
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
            "Workspace update failed"
        );
      }

      return result.data as ResponseType;
    },

    onSuccess: (updatedWorkspace) => {
      toast.success("Workspace updated!");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
      router.refresh();
    },

    onError: (error) => {
      toast.error(error.message || "Update failed.");
    },
  });
};
