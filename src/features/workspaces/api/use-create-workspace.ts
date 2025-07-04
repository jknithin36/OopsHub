// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { InferRequestType, InferResponseType } from "hono";
// import { client } from "@/lib/rpc";
// import { toast } from "sonner";

// type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
// type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;

// export const useCreateWorkSpace = () => {
//   const queryClient = useQueryClient();

//   const mutation = useMutation<ResponseType, Error, RequestType>({
//     mutationFn: async ({ form }) => {
//       const response = await client.api.workspaces.$post({ form });

//       if (!response.ok) throw new Error("Workspace failed");
//       return await response.json();
//     },

//     onSuccess: () => {
//       toast.success("workSpace Created");
//       queryClient.invalidateQueries({ queryKey: ["workspaces"] });
//     },

//     onError: (error) => {
//       toast.error(`Failed to create workspace: ${error.message}`);
//     },
//   });

//   return mutation;
// };
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateWorkSpace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("/api/workspaces", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data?.error?.issues?.[0]?.message || "Failed");

      return data;
    },

    onSuccess: () => {
      toast.success("Workspace created!");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },

    onError: (error) => {
      toast.error(error.message || "Creation failed.");
    },
  });
};
