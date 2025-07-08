"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useJoinWorkspace = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      workspaceId,
      code,
    }: {
      workspaceId: string;
      code: string;
    }) => {
      if (!workspaceId || !code) {
        throw new Error("Workspace ID and invite code are required");
      }

      const res = await fetch(`/api/workspaces/${workspaceId}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to join workspace");
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success("Joined workspace successfully!");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },

    onError: (error) => {
      toast.error(error.message || "Failed to join workspace.");
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
};
