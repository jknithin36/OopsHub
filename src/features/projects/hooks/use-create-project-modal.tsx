"use client";

import { createContext, useContext, useState } from "react";

interface ProjectModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setIsOpen: (v: boolean) => void;
}

const ProjectModalContext = createContext<ProjectModalContextType | undefined>(
  undefined
);

export const ProjectModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProjectModalContext.Provider
      value={{
        isOpen,
        setIsOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </ProjectModalContext.Provider>
  );
};

export const useProjectModal = () => {
  const ctx = useContext(ProjectModalContext);
  if (!ctx)
    throw new Error("useProjectModal must be used within ProjectModalProvider");
  return ctx;
};
