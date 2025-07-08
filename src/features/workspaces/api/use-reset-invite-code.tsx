"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useResetInviteCode = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workspaceId: string) => {
      if (!workspaceId || typeof workspaceId !== "string") {
        throw new Error("Invalid workspace ID");
      }

      const res = await fetch(
        `/api/workspaces/${workspaceId}/reset-invite-code`,
        {
          method: "POST",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to reset invite code");
      }

      return data;
    },

    onSuccess: (data) => {
      toast.success("Invite code reset successfully.");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });

      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },

    onError: (error) => {
      toast.error(error.message || "Failed to reset invite code.");
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
};
