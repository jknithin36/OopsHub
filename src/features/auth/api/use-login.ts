import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.auth.login)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.auth.login)["$post"]>;

export const useLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.login.$post({ json });

      if (!response.ok) throw new Error("Login failed");
      return await response.json();
    },

    onSuccess: () => {
      toast.success("Logged in successfully ");
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },

    onError: (error) => {
      toast.error(`Login failed: ${error.message}`);
    },
  });

  return mutation;
};
