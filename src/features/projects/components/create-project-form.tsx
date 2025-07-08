"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateProject } from "../api/use-create-project";
import { useWorkSpaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  image: z
    .any()
    .refine((file) => !file || file instanceof File, "Invalid image file")
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Props {
  onCancel?: () => void;
}

export const CreateProjectForm = ({ onCancel }: Props) => {
  const workspaceId = useWorkSpaceId();
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const { mutate: createProject, isPending } = useCreateProject({
    onSuccess: () => {
      form.reset();
      setPreview(null);
      toast.success("Project created successfully!");
      onCancel?.();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create project.");
    },
  });

  const onSubmit = (values: FormValues) => {
    if (!workspaceId) {
      toast.error("Workspace ID is missing. Please refresh and try again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("workspaceId", workspaceId); // ✅ Must be passed
    if (values.image) {
      formData.append("image", values.image);
    }

    createProject(formData);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Optional debug
  useEffect(() => {
    console.log("🧩 Current Workspace ID:", workspaceId);
  }, [workspaceId]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
      {/* Project Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input
          id="name"
          {...form.register("name")}
          disabled={isPending}
          placeholder="e.g. Marketing Website"
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image">Project Icon (optional)</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isPending}
        />
        {preview && (
          <Image
            src={preview}
            alt="Project Preview"
            width={40}
            height={40}
            className="rounded-md mt-2"
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Create
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
