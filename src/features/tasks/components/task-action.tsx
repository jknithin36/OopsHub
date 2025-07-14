"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ExternalLink, Pencil, Trash } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { useEditTaskModal } from "@/features/tasks/hooks/use-edit-task-modal"; // ✅ EDIT MODAL HOOK
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
  const { open } = useEditTaskModal(); // ✅ OPEN MODAL CONTEXT

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
    open(id); // ✅ OPEN the edit modal with the task ID
  };

  return (
    <>
      <ConfirmDialog />
      <div className="flex justify-end">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 rounded-md border bg-white p-1 shadow-md"
          >
            {/* Task Details */}
            <DropdownMenuItem
              onClick={onOpenTask}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium cursor-pointer"
            >
              <ExternalLink className="size-4 stroke-2" />
              Task Details
            </DropdownMenuItem>

            {/* Edit Task */}
            <DropdownMenuItem
              onClick={handleEdit}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium cursor-pointer"
            >
              <Pencil className="size-4 stroke-2" />
              Edit Task
            </DropdownMenuItem>

            {/* Open Project */}
            <DropdownMenuItem
              onClick={onOpenProject}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium cursor-pointer"
            >
              <ExternalLink className="size-4 stroke-2" />
              Open Project
            </DropdownMenuItem>

            {/* Delete Task */}
            <DropdownMenuItem
              onClick={handleDelete}
              disabled={isPending}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 cursor-pointer"
            >
              <Trash className="size-4 stroke-2" />
              Delete Task
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
