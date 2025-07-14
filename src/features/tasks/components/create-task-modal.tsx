"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateTaskFormWrapper } from "./create-task-form-wrapper";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { Info } from "lucide-react";

export const CreateTaskModal = () => {
  const { isOpen, close } = useCreateTaskModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden rounded-xl shadow-lg border bg-background">
        <div className="flex flex-col md:flex-row w-full h-[85vh]">
          {/* Left: Form Section */}
          <div className="w-full md:w-2/3 px-10 py-8 overflow-y-auto">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-3xl font-semibold text-foreground">
                Create Task
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Add all required details to get your task up and running.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-8">
              <ScrollArea className="pr-2">
                <CreateTaskFormWrapper onCancel={close} />
              </ScrollArea>
            </div>
          </div>

          {/* Right: Sidebar Tips */}
          <div className="hidden md:flex md:w-1/3 flex-col bg-muted px-8 py-10 gap-6 border-l border-border">
            <div className="flex items-start gap-4">
              <Info className="text-muted-foreground mt-1" />
              <div>
                <p className="text-base font-medium text-foreground">
                  Why tasks matter
                </p>
                <p className="text-sm text-muted-foreground">
                  Tasks help you organize priorities and hold your team
                  accountable.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Info className="text-muted-foreground mt-1" />
              <div>
                <p className="text-base font-medium text-foreground">
                  Pro tip 💡
                </p>
                <p className="text-sm text-muted-foreground">
                  Start small, add only what’s necessary now—you can always
                  update later.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Info className="text-muted-foreground mt-1" />
              <div>
                <p className="text-base font-medium text-foreground">
                  Need structure?
                </p>
                <p className="text-sm text-muted-foreground">
                  Use status, due dates, and assignees to track progress like a
                  pro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
