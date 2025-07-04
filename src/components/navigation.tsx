"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { GoHome, GoHomeFill } from "react-icons/go";
import { MdTaskAlt, MdOutlineTaskAlt } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { PiUsersThreeLight, PiUsersThreeFill } from "react-icons/pi";

const routes = [
  {
    label: "Home",
    href: "/",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    icon: MdOutlineTaskAlt,
    activeIcon: MdTaskAlt,
  },
  {
    label: "Members",
    href: "/members",
    icon: PiUsersThreeLight,
    activeIcon: PiUsersThreeFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: FiSettings,
    activeIcon: IoSettingsSharp,
  },
];

export const Navigation = () => {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1">
      {routes.map((item) => {
        const isActive = pathname === item.href;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white"
                  : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
