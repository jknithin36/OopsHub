"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
import { Loader2, ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCreateWorkSpace } from "../api/use-create-workspace";
import { useRouter } from "next/navigation";

type FormValues = {
  name: string;
  image?: File;
};

interface Props {
  onCancel?: () => void;
}

export const CreateWorkSpaceForm = ({ onCancel }: Props) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { mutate, isPending } = useCreateWorkSpace({
    onSuccess: (data) => {
      const id = data?.data?.$id || data?.data?.id;
      if (id) {
        onCancel?.();
        router.push(`/workspaces/${id}`);
      } else {
        toast.error("Workspace created but no ID returned.");
      }
    },
  });

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
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
    setImagePreview(URL.createObjectURL(file));
  };

  const onSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    mutate(formData);
  };

  return (
    <div>
      <div className="px-4 py-3">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Create a New Workspace
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Workspaces help you group projects and manage team members.
        </p>
      </div>
      <div className="px-4 py-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Workspace name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Workspace Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Marketing, Engineering, Design Team"
                      className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-md text-sm text-foreground"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Logo */}
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Workspace Logo
                  </FormLabel>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                      {imagePreview ? (
                        <AvatarImage
                          src={imagePreview}
                          alt="Preview"
                          className="object-cover w-full h-full rounded-xl"
                        />
                      ) : (
                        <AvatarFallback className="flex items-center justify-center bg-white dark:bg-gray-900">
                          <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        ref={inputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => inputRef.current?.click()}
                        disabled={isPending}
                        className="px-2 py-1 rounded-md text-sm text-muted-foreground hover:bg-muted transition duration-200"
                      >
                        Upload Image
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, or SVG. Max 1MB.
                      </p>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                disabled={isPending}
                className="px-2 py-1 rounded-md text-sm text-muted-foreground hover:bg-muted transition duration-200"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="px-2 py-1 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-300 transition duration-200"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create Workspace"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
