import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetMembers = (workspaceId: string) => {
  return useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      const res = await fetch(`/api/members?workspaceId=${workspaceId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to fetch members");
      }

      return data.data?.documents || []; // <-- ✅ Fix here
    },
    enabled: !!workspaceId,
    onError: (err: any) => {
      toast.error(err.message || "Something went wrong while loading members");
    },
  });
};
