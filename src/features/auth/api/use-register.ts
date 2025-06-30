// import { useMutation } from "@tanstack/react-query";
// import { InferRequestType, InferResponseType } from "hono";
// import { client } from "@/lib/rpc";

// type ResponseType = InferResponseType<
//   (typeof client.api.auth.register)["$post"]
// >;
// type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;

// export const useRegister = () => {
//   const mutation = useMutation<ResponseType, Error, RequestType>({
//     mutationFn: async ({ json }) => {
//       const response = await client.api.auth.register.$post({ json });

//       if (!response.ok) throw new Error("Registration failed");
//       return response.json();
//     },
//   });

//   return mutation;
// };
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;
type RequestType = {
  json: InferRequestType<(typeof client.api.auth.register)["$post"]>;
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.auth.register.$post({ json });

      if (!response.ok) throw new Error("Registration failed");
      return response.json();
    },

    onSuccess: () => {
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
  });

  return mutation;
};
