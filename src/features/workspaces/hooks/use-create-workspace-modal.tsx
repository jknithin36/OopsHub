"use client";

import { createContext, useContext, useState } from "react";

interface WorkspaceModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setIsOpen: (v: boolean) => void;
}

const WorkspaceModalContext = createContext<
  WorkspaceModalContextType | undefined
>(undefined);

export const WorkspaceModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WorkspaceModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </WorkspaceModalContext.Provider>
  );
};

export const useWorkspaceModal = () => {
  const ctx = useContext(WorkspaceModalContext);
  if (!ctx)
    throw new Error(
      "useWorkspaceModal must be used within WorkspaceModalProvider"
    );
  return ctx;
};
