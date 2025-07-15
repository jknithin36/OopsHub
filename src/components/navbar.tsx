"use client";

import React from "react";
import { UserButton } from "@/features/auth/components/user-button";
import MobileSidebar from "./mobile-sidebar";
import { Bell, Search, Command, Sun } from "lucide-react";
import WorkSpaceSwitcher from "./work-space-switcher";
import { JoinWithInviteLinkDialog } from "@/features/workspaces/components/join-workspace";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-2.5 flex items-center justify-between">
      {/* Left side - Search and mobile menu */}
      <div className="flex items-center gap-4 w-full max-w-2xl">
        <div className="lg:hidden">
          <MobileSidebar />
        </div>

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, tasks, or members..."
            className="pl-9 pr-4 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
            <kbd className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
              ⌘
            </kbd>
            <kbd className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right side - Actions and user */}
      <div className="flex items-center gap-2.5 shrink-0">
        <WorkSpaceSwitcher />
        <JoinWithInviteLinkDialog />

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Command className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>

        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
          <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-blue-500 rounded-full"></span>
        </button>

        <div className="ml-1">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
