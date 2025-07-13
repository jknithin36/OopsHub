"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useDeleteProject } from "../api/use-delete-project";
import { ConfirmDialog } from "@/components/confirm-modal";

interface Props {
  projectId: string;
  workspaceId: string;
}

export const DeleteProjectButton = ({ projectId, workspaceId }: Props) => {
  const [open, setOpen] = useState(false);

  const { mutate: deleteProject, isPending } = useDeleteProject({
    projectId,
    workspaceId,
  });

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </Button>

      <ConfirmDialog
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          deleteProject();
        }}
        title="Delete this project?"
        description="This action cannot be undone. All tasks and data in this project will be lost."
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="destructive"
      />
    </>
  );
};
