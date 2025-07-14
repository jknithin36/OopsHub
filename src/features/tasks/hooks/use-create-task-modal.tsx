"use client";

import { createContext, useContext, useState } from "react";

interface TaskModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setIsOpen: (v: boolean) => void;
}

const TaskModalContext = createContext<TaskModalContextType | undefined>(
  undefined
);

export const TaskModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <TaskModalContext.Provider value={{ isOpen, open, close, setIsOpen }}>
      {children}
    </TaskModalContext.Provider>
  );
};

// ✅ Correct name export
export const useCreateTaskModal = () => {
  const ctx = useContext(TaskModalContext);
  if (!ctx)
    throw new Error("useCreateTaskModal must be used within TaskModalProvider");
  return ctx;
};
