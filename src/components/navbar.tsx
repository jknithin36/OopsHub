"use client";

import React from "react";
import { UserButton } from "@/features/auth/components/user-button";
import MobileSidebar from "./mobile-sidebar";
import { Bell, Search, Command, Sun } from "lucide-react";
import WorkSpaceSwitcher from "./work-space-switcher";
import { JoinWithInviteLinkDialog } from "@/features/workspaces/components/join-workspace";

const SearchInput = () => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-md border border-muted-foreground/20 text-sm focus-within:border-foreground transition">
    <Search className="w-4 h-4 text-muted-foreground" />
    <input
      type="text"
      placeholder="Search..."
      className="bg-transparent outline-none w-32 placeholder:text-muted-foreground"
    />
  </div>
);

const CommandMenuTrigger = () => (
  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition">
    <Command className="w-4 h-4" />
    <span className="hidden sm:inline">Command</span>
  </button>
);

const ThemeToggle = () => (
  <button className="text-muted-foreground hover:text-foreground transition">
    <Sun className="w-5 h-5" />
  </button>
);

const NotificationBell = () => (
  <button className="text-muted-foreground hover:text-foreground transition">
    <Bell className="w-5 h-5" />
  </button>
);

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-background border-b border-muted px-4 lg:px-6 py-3 flex items-center justify-between">
      <div className="block lg:hidden">
        <MobileSidebar />
      </div>

      <div className="hidden lg:flex flex-col">
        <h1 className="text-2xl font-semibold text-foreground">Home</h1>
        <p className="text-sm text-muted-foreground">
          Welcome to your Oopshub — manage tasks, members, and settings all in
          one place.
        </p>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <WorkSpaceSwitcher />
        <SearchInput />
        <JoinWithInviteLinkDialog />
        <CommandMenuTrigger />
        <ThemeToggle />
        <NotificationBell />
        <UserButton />
      </div>
    </nav>
  );
}
