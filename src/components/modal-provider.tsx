// components/modal-provider.tsx
"use client";

import { ProjectModalProvider } from "@/features/projects/hooks/use-create-project-modal";
import { WorkspaceModalProvider } from "@/features/workspaces/hooks/use-create-workspace-modal";

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WorkspaceModalProvider>
      <ProjectModalProvider>{children}</ProjectModalProvider>
    </WorkspaceModalProvider>
  );
};
