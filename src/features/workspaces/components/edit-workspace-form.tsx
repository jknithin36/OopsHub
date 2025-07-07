"use client";

import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { Workspace } from "../types";
import { getImageUrl } from "@/lib/get-image-url"; // ✅ your image helper

interface UpdateWorkspaceFormProps {
  workspace: Workspace;
  onSuccess?: () => void;
}

type FormValues = {
  name: string;
  image?: File;
};

export const UpdateWorkspaceForm = ({
  workspace,
  onSuccess,
}: UpdateWorkspaceFormProps) => {
  const { workspaceId } = useParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // ✅ Load existing image using getImageUrl helper
  useEffect(() => {
    const url = getImageUrl(workspace.imageUrl);
    setImagePreview(url);
  }, [workspace.imageUrl]);

  const updateMutation = useUpdateWorkspace(workspaceId as string);

  const form = useForm<FormValues>({
    defaultValues: {
      name: workspace.name,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error("Image must be under 1MB.");
      return;
    }

    form.setValue("image", file);
    setImagePreview(URL.createObjectURL(file)); // show selected preview
  };

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    updateMutation.mutate(
      { formData },
      {
        onSuccess: () => {
          toast.success("Workspace updated!");
          onSuccess?.();
          router.push(`/workspaces/${workspaceId}`); // ✅ navigate back
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <div className="w-full max-w-xl bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Update Workspace</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Workspace Name */}
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Workspace name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Workspace Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter workspace name"
                    className="bg-white border border-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Workspace Logo</FormLabel>
                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14 rounded-md border overflow-hidden">
                    {imagePreview ? (
                      <AvatarImage
                        src={imagePreview}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <AvatarFallback className="bg-gray-200 text-gray-500">
                        Logo
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleFileChange}
                    className="text-sm text-gray-600"
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex justify-between items-center pt-2 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/workspaces/${workspaceId}`)}
              disabled={updateMutation.isPending}
            >
              Go Back
            </Button>

            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                "Update Workspace"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
