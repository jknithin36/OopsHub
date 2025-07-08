import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateRoleInput {
  memberId: string;
  role: "ADMIN" | "MEMBER";
}

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ memberId, role }: UpdateRoleInput) => {
      const res = await fetch(`/api/members/${memberId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = data?.error || "Failed to update member role";
        throw new Error(message);
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Member role updated");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (err: any) => {
      if (err.message.includes("last admin")) {
        toast.error("❌ You cannot remove the last admin from the workspace.");
      } else {
        toast.error(err.message || "Could not update role");
      }
    },
  });
};
