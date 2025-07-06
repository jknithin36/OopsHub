// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// export const useCreateWorkSpace = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (formData: FormData) => {
//       const res = await fetch("/api/workspaces", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok)
//         throw new Error(data?.error?.issues?.[0]?.message || "Failed");

//       return data;
//     },

//     onSuccess: () => {
//       toast.success("Workspace created!");
//       queryClient.invalidateQueries({ queryKey: ["workspaces"] });
//     },

//     onError: (error) => {
//       toast.error(error.message || "Creation failed.");
//     },
//   });
// };
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateWorkSpace = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}) => {
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

    onSuccess: (data) => {
      toast.success("Workspace created!");
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });

      if (options?.onSuccess) {
        options.onSuccess(data); // pass workspace data to form
      }
    },

    onError: (error) => {
      toast.error(error.message || "Creation failed.");
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
};
