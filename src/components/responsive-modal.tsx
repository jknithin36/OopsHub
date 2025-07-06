"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useMedia } from "react-use";

interface ResponsiveModalProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({
  children,
  open,
  onOpenChange,
}: ResponsiveModalProps) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full max-w-4xl p-0 min-h-[70vh] overflow-y-auto bg-muted rounded-xl">
          <VisuallyHidden>
            <DialogTitle>Create Workspace</DialogTitle>
          </VisuallyHidden>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-4 sm:p-6 bg-muted rounded-t-2xl">
        <div className="max-h-[85vh] overflow-y-auto">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
