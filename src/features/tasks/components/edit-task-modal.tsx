"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";
import { EditTaskFormWrapper } from "./EditTaskFormWrapper";

export const EditTaskModal = () => {
  const { isOpen, close, taskId } = useEditTaskModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden rounded-xl shadow-lg border bg-background">
        <div className="flex flex-col md:flex-row w-full h-[85vh]">
          <div className="w-full md:w-2/3 px-10 py-8 overflow-y-auto">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-3xl font-semibold text-foreground">
                Edit Task
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Update the details of your task.
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="pr-2">
              {taskId && (
                <EditTaskFormWrapper taskId={taskId} onCancel={close} />
              )}
            </ScrollArea>
          </div>

          <div className="hidden md:flex md:w-1/3 flex-col bg-muted px-8 py-10 gap-6 border-l border-border">
            {/* (same sidebar tips as CreateTaskModal) */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
