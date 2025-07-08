// ✅ UpdateWorkspaceForm.tsx
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
import { getImageUrl } from "@/lib/get-image-url";

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

  useEffect(() => {
    const url = getImageUrl(workspace.imageUrl);
    setImagePreview(url);
  }, [workspace.imageUrl]);

  const updateMutation = useUpdateWorkspace(workspaceId as string);
  const form = useForm<FormValues>({ defaultValues: { name: workspace.name } });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) return toast.error("Image must be under 1MB.");

    form.setValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image instanceof File) formData.append("image", values.image);

    updateMutation.mutate(
      { formData },
      {
        onSuccess: () => {
          toast.success("Workspace updated!");
          onSuccess?.();
          router.push(`/workspaces/${workspaceId}`);
        },
        onError: (error) => toast.error(error.message),
      }
    );
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">
      <h2 className="text-base font-medium text-muted-foreground">
        Workspace Details
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    className="bg-background border"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Workspace Logo</FormLabel>
                <div className="flex items-center gap-3">
                  <Avatar className="w-14 h-14 rounded-full border">
                    {imagePreview ? (
                      <AvatarImage src={imagePreview} alt="Preview" />
                    ) : (
                      <AvatarFallback>
                        {workspace.name[0].toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      onChange={handleFileChange}
                      className="text-sm text-muted-foreground"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Max 1MB. Square images preferred.
                    </p>
                  </div>
                </div>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/workspaces/${workspaceId}`)}
              disabled={updateMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> Updating...
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
