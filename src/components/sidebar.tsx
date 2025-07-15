"use client";

import Image from "next/image";
import Link from "next/link";
import { Navigation } from "./navigation";
import WorkSpace from "./workspace";
import Projects from "./projects";

export const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800 border-r border-gray-200 dark:border-gray-700/50 flex flex-col justify-between sticky top-0 left-0 shadow-sm z-50 font-sans">
      {/* 🔝 Top Section: Logo Only */}
      <div className="px-4 py-6 space-y-5">
        <Link
          href="/"
          className="flex justify-center hover:opacity-90 transition-all duration-200"
        >
          <Image
            src="/navbar.png"
            alt="Oopshub Logo"
            width={132} // Increased from 40
            height={132} // Increased from 40
          />
        </Link>

        <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 leading-tight">
          Start Your Day
          <br />
          <span className="text-blue-600 dark:text-blue-400">
            Be Productive ✌️
          </span>
        </h2>

        <WorkSpace />
      </div>

      {/* 🧭 Main Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Menu
          </p>
          <Navigation />
        </div>

        <div className="space-y-2">
          <Projects />
        </div>

        {/* 💬 Feedback card */}
        <div className="bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-850 rounded-lg border border-gray-200 dark:border-gray-700/50 px-4 py-5 text-center text-sm text-gray-600 dark:text-gray-300 space-y-2 hover:scale-[1.02] transition-transform duration-200">
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            💬 Got Feedback?
          </p>
          <p>Help us improve Oopshub.</p>
          <Link
            href="mailto:insane414425@gmail.com"
            className="inline-block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
          >
            Send Feedback →
          </Link>
        </div>
      </div>

      {/* 🔻 Footer */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-850 text-center text-sm text-gray-500 dark:text-gray-400">
        <p className="italic font-medium">Oops, work just got easier.</p>
        <Link
          href="https://www.linkedin.com/in/jknithin/"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect on LinkedIn →
        </Link>
      </div>
    </aside>
  );
};
