import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc";

export const useGetWorkspaces = () => {
  const query = useQuery({
    queryKey: ["workspaces"],
    queryFn: async () => {
      console.log(" Fetching workspaces...");
      const response = await client.api.workspaces.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch workspaces");
      }

      const { data } = await response.json();
      console.log("✅ Parsed JSON:", data);

      return data;
    },
  });

  return query;
};
