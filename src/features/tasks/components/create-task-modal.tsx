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
import {
  Info,
  AlertCircle,
  CheckCircle,
  Calendar as CalendarIcon,
  Tag,
  User,
  Flag,
  Clock,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const CreateTaskModal = () => {
  const { isOpen, close } = useCreateTaskModal();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Left: Form Section */}
          <div className="w-full md:w-3/5 p-8 overflow-y-auto">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                Create New Task
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-2">
                Fill in the details below to create a new task for your team.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[calc(95vh-180px)] pr-4">
              <CreateTaskFormWrapper onCancel={close} />
            </ScrollArea>
          </div>

          {/* Right: Tips Section */}
          <div className="hidden md:flex md:w-2/5 flex-col bg-gray-50 p-8 gap-6 border-l border-gray-200">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                Task Creation Guide
              </h3>
              <p className="text-sm text-gray-500">
                Follow these best practices to create effective tasks.
              </p>
            </div>

            <Separator className="bg-gray-200" />

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <AlertCircle className="text-blue-600 h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Clear Naming
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Use specific, action-oriented names like "Update homepage
                    hero section" instead of vague terms like "Fix design".
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <User className="text-purple-600 h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Proper Assignment
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Assign tasks to team members with the right skills.
                    Unassigned tasks often get overlooked.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Flag className="text-green-600 h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Status Tracking
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Start with "To Do" status and update as work progresses.
                    This helps with workflow visibility.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <Clock className="text-yellow-600 h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Realistic Deadlines
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Set achievable due dates. Tasks without deadlines tend to
                    linger in backlogs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-2 rounded-lg">
                  <CheckCircle className="text-red-600 h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Completion Criteria
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Clearly define what "done" looks like in the description to
                    avoid ambiguity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
