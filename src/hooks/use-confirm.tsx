"use client";

import { useState } from "react";
import { ButtonProps } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/confirm-modal";

interface ConfirmOptions {
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: ButtonProps["variant"];
  icon?: React.ReactNode;
  extraDescription?: string;
}

type UseConfirmReturn = readonly [() => JSX.Element, () => Promise<boolean>];

export function useConfirm(
  title: string,
  description: string,
  options: ConfirmOptions = {}
): UseConfirmReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [resolver, setResolver] = useState<((v: boolean) => void) | null>(null);

  const confirm = () =>
    new Promise<boolean>((resolve) => {
      setIsOpen(true);
      setResolver(() => resolve);
    });

  const handleCancel = () => {
    resolver?.(false);
    setIsOpen(false);
  };

  const handleConfirm = () => {
    resolver?.(true);
    setIsOpen(false);
  };

  const DialogWrapper = () => (
    <ConfirmDialog
      open={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      title={title}
      description={description}
      {...options}
    />
  );

  return [DialogWrapper, confirm] as const;
}
