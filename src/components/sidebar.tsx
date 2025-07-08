"use client";

import Image from "next/image";
import Link from "next/link";
import { Navigation } from "./navigation";
import WorkSpace from "./workspace";
import Projects from "./projects"; // ✅ Import your component

export const Sidebar = () => {
  return (
    <aside className="h-screen w-64 border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col justify-between sticky top-0 left-0 shadow-sm z-50">
      {/* 🔝 Top: Logo + Workspace Selector */}
      <div className="px-4 py-5 border-b border-muted flex flex-col gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/navbar.png"
            alt="Oopshub Logo"
            width={140}
            height={40}
            priority
            className="object-contain"
          />
        </Link>
        <span className="text-xs text-muted-foreground italic">
          Work smarter with Oopshub
        </span>

        <div className="mt-3">
          <WorkSpace />
        </div>
      </div>

      {/* 🔃 Middle: Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <Navigation />

        {/* ✅ Insert Projects component here */}
        <Projects />

        {/* Feedback */}
        <div className="px-3 py-3 rounded-lg border border-muted bg-muted/40 text-center text-xs text-muted-foreground space-y-1">
          <p className="font-semibold text-sm text-foreground">
            💬 Got feedback?
          </p>
          <p>Help us improve Oopshub. We’re listening.</p>
          <Link
            href="mailto:insane414425@gmail.com"
            className="inline-block mt-1 text-blue-600 font-medium hover:underline text-xs"
          >
            Send feedback →
          </Link>
        </div>
      </div>

      {/* 🔻 Bottom Footer */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-neutral-800 text-center text-xs text-muted-foreground">
        <p className="mb-1 italic">Oops, work just got easier.</p>
        <Link
          href="https://www.linkedin.com/in/jknithin/"
          className="text-blue-600 font-semibold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn →
        </Link>
      </div>
    </aside>
  );
};
