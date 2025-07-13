"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useUpdateProject } from "@/features/projects/api/use-update-project";
import { updateProjectSchema } from "../schema";

interface Props {
  initialValues: {
    $id: string;
    name: string;
    workspaceId: string;
    imgUrl?: string | null;
  };
  onCancel?: () => void;
}

const formSchema = updateProjectSchema;
type FormValues = z.infer<typeof formSchema>;

export const UpdateProjectForm = ({ initialValues, onCancel }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues.name || "",
      image: undefined,
      workspaceId: initialValues.workspaceId,
    },
  });

  const { mutate: updateProject, isPending } = useUpdateProject(
    initialValues.$id
  );

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("name", values.name || "");
    formData.append("workspaceId", initialValues.workspaceId);
    if (values.image && values.image instanceof File) {
      formData.append("image", values.image);
    }

    updateProject({ formData });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const imageUrl =
    preview ||
    (initialValues.imgUrl
      ? `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID}/files/${initialValues.imgUrl}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`
      : null);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 bg-background p-6 rounded-xl border w-full max-w-xl"
    >
      {/* Project Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input id="name" {...form.register("name")} disabled={isPending} />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      {/* Image */}
      <div className="space-y-2">
        <Label htmlFor="image">Project Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={inputRef}
        />
        {imageUrl && (
          <div className="relative w-20 h-20 mt-2 rounded-md overflow-hidden border">
            <Image src={imageUrl} alt="Preview" fill className="object-cover" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Save Changes
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
