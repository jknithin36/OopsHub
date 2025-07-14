"use client";

import { createContext, useContext, useState } from "react";

// 1. Define the context shape
interface EditTaskModalContextType {
  isOpen: boolean;
  open: (id: string) => void;
  close: () => void;
  taskId: string | null;
}

// 2. Create the context
const EditTaskModalContext = createContext<
  EditTaskModalContextType | undefined
>(undefined);

// 3. Create the provider
export const EditTaskModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);

  const open = (id: string) => {
    setTaskId(id);
    setIsOpen(true);
  };

  const close = () => {
    setTaskId(null);
    setIsOpen(false);
  };

  return (
    <EditTaskModalContext.Provider value={{ isOpen, open, close, taskId }}>
      {children}
    </EditTaskModalContext.Provider>
  );
};

// 4. Custom hook to use in components
export const useEditTaskModal = () => {
  const context = useContext(EditTaskModalContext);
  if (!context) {
    throw new Error(
      "useEditTaskModal must be used within an EditTaskModalProvider"
    );
  }
  return context;
};
