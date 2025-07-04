"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MenuIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Automatically close sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} modal={true}>
      {/* 📱 Trigger Button (visible only on mobile) */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden p-2 rounded-md hover:bg-muted"
        >
          <MenuIcon className="w-5 h-5 text-muted-foreground" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </SheetTrigger>

      {/* 📲 Mobile Drawer Content */}
      <SheetContent
        side="left"
        className="p-0 w-64 max-w-[90vw] bg-background border-r border-muted shadow-md flex flex-col"
      >
        {/* 🔒 Sticky Close Button */}
        <div className="sticky top-0 z-10 flex justify-end p-2 border-b border-muted bg-background">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-muted"
          >
            <X className="w-5 h-5 text-muted-foreground" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        {/* 🌐 Sidebar Content */}
        <div className="flex-1 overflow-y-auto">
          <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
}
