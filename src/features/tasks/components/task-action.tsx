"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLink, Pencil, Trash } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { useEditTaskModal } from "@/features/tasks/hooks/use-edit-task-modal";
import { useRouter } from "next/navigation";
import { useWorkSpaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

export const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  const workspaceId = useWorkSpaceId();
  const router = useRouter();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "This action cannot be undone.",
    {
      confirmVariant: "destructive",
      confirmText: "Delete",
      cancelText: "Cancel",
    }
  );

  const { mutate: deleteTask, isPending } = useDeleteTask();
  const { open } = useEditTaskModal();

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  const handleDelete = async () => {
    const confirmed = await confirm();
    if (!confirmed) return;
    deleteTask({ param: { taskId: id } });
  };

  const handleEdit = () => {
    open(id);
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 rounded-md border bg-background shadow-lg overflow-hidden"
        >
          <DropdownMenuItem
            onClick={onOpenTask}
            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted/50 focus:bg-muted/50"
          >
            <ExternalLink className="size-4" />
            <span>Task Details</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleEdit}
            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted/50 focus:bg-muted/50"
          >
            <Pencil className="size-4" />
            <span>Edit Task</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-muted/50" />

          <DropdownMenuItem
            onClick={onOpenProject}
            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted/50 focus:bg-muted/50"
          >
            <ExternalLink className="size-4" />
            <span>Open Project</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-muted/50" />

          <DropdownMenuItem
            onClick={handleDelete}
            disabled={isPending}
            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-destructive/90 hover:text-destructive-foreground focus:bg-destructive/90 focus:text-destructive-foreground"
          >
            <Trash className="size-4" />
            <span>Delete Task</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
