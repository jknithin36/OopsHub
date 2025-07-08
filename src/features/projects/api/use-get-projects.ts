import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetProjects = (workspaceId?: string) => {
  return useQuery({
    queryKey: ["projects", workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];

      const response = await client.api.projects.$get({
        query: { workspaceId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Projects");
      }

      const { data } = await response.json();

      return data;
    },
    enabled: !!workspaceId,
  });
};
