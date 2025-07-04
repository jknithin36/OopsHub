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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, ImageIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCreateWorkSpace } from "../api/use-create-workspace";

type FormValues = {
  name: string;
  image?: File;
};

interface Props {
  onCancel?: () => void;
}

export const CreateWorkSpaceForm = ({ onCancel }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { mutate, isPending } = useCreateWorkSpace();

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
      alert("Image must be under 1MB.");
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Workspace</CardTitle>
      </CardHeader>

      <CardContent>
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
                    <Input placeholder="Enter name" {...field} />
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
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 rounded-md border overflow-hidden">
                      {imagePreview ? (
                        <AvatarImage
                          src={imagePreview}
                          className="object-cover w-full h-full"
                          alt="Preview"
                        />
                      ) : (
                        <AvatarFallback>
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
                      >
                        Upload Image
                      </Button>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, SVG • Max 1MB
                      </p>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
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
      </CardContent>
    </Card>
  );
};
