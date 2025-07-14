import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/rpc";
import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.tasks)[":taskId"]["$patch"]
>;
type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":taskId"]["$patch"],
  200
>;

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, body }) => {
      const res = await client.api.tasks[":taskId"]["$patch"]({
        param,
        json: body,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Failed to update task");
      }

      return res.json();
    },
    onSuccess: async (data) => {
      toast.success("✅ Task updated successfully!");
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
      await queryClient.invalidateQueries({
        queryKey: ["task", data.task?.$id],
      });
    },
    onError: (err) => {
      toast.error(err.message || "❌ Failed to update task");
    },
  });
};
