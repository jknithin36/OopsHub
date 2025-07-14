"use client";

import { ProjectModalProvider } from "@/features/projects/hooks/use-create-project-modal";
import { EditTaskModal } from "@/features/tasks/components/edit-task-modal";
import { TaskModalProvider } from "@/features/tasks/hooks/use-create-task-modal";
import { EditTaskModalProvider } from "@/features/tasks/hooks/use-edit-task-modal";
import { WorkspaceModalProvider } from "@/features/workspaces/hooks/use-create-workspace-modal";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WorkspaceModalProvider>
      <ProjectModalProvider>
        <TaskModalProvider>
          {" "}
          <EditTaskModalProvider>{children}</EditTaskModalProvider>
        </TaskModalProvider>
      </ProjectModalProvider>
    </WorkspaceModalProvider>
  );
};
