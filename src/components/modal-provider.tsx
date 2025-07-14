"use client";

import { ProjectModalProvider } from "@/features/projects/hooks/use-create-project-modal";
import { TaskModalProvider } from "@/features/tasks/hooks/use-create-task-modal";
import { WorkspaceModalProvider } from "@/features/workspaces/hooks/use-create-workspace-modal";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WorkspaceModalProvider>
      <ProjectModalProvider>
        <TaskModalProvider>{children}</TaskModalProvider>
      </ProjectModalProvider>
    </WorkspaceModalProvider>
  );
};
