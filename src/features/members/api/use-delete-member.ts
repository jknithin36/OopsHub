"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useDeleteMember = (currentUserId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (memberId: string) => {
      const res = await fetch(`/api/members/${memberId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to delete member");

      return { memberId };
    },
    onSuccess: ({ memberId }) => {
      toast.success("Member removed");
      queryClient.invalidateQueries({ queryKey: ["members"] });

      if (memberId === currentUserId) {
        // ✅ Redirect current user if they deleted themselves
        router.push("/");
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Could not delete member");
    },
  });
};
