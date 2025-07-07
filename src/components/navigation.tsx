"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { GoHome, GoHomeFill } from "react-icons/go";
import { MdTaskAlt, MdOutlineTaskAlt } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { PiUsersThreeLight, PiUsersThreeFill } from "react-icons/pi";

import { useWorkSpaceId } from "@/features/workspaces/hooks/use-workspace-id";

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
  const workspaceId = useWorkSpaceId();
  const pathname = usePathname();

  return (
    <ul className="flex flex-col space-y-1">
      {routes.map((item) => {
        const fullHref = `/workspaces/${workspaceId}${item.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <li key={item.href}>
            <Link
              href={fullHref}
              className={cn(
                "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-muted text-foreground dark:bg-neutral-800"
                  : "text-muted-foreground hover:bg-muted/60 dark:hover:bg-muted/20"
              )}
            >
              {/* 🔵 Left Indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1.5 rounded-r bg-blue-600" />
              )}

              <Icon
                className={cn(
                  "w-5 h-5 transition",
                  isActive && "text-blue-600"
                )}
              />
              <span>{item.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
