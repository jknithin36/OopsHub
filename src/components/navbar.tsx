import { UserButton } from "@/features/auth/components/user-button";
import React from "react";
import MobileSidebar from "./mobile-sidebar";

export default function Navbar() {
  return (
    <nav className="pt-4 px-6 flex items-center justify-between">
      {/* Title + Subtitle shown only on large screens */}
      <div className="flex-col hidden lg:flex">
        <h1 className="text-2xl font-semibold">Home</h1>
        <p className="text-muted-foreground">
          Welcome to your Oopshub — manage tasks, members, and settings all in
          one place.
        </p>
      </div>
      <MobileSidebar />
      <UserButton />
    </nav>
  );
}
