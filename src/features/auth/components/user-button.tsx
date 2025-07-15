"use client";

import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useCurrent } from "../api/use-current";
import { useLogout } from "../api/use-logout";
import { LogOut, Loader2 } from "lucide-react";

export const UserButton = () => {
  const { data: user, isLoading } = useCurrent();
  const { mutate: logout, isPending } = useLogout();

  if (isLoading) {
    return (
      <div className="size-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
        <Loader2 className="size-4 animate-spin text-gray-500 dark:text-gray-400" />
      </div>
    );
  }

  if (!user) return null;

  const { name, email } = user;
  const avatarFallback =
    name?.trim()?.charAt(0).toUpperCase() ||
    email?.trim()?.charAt(0).toUpperCase() ||
    "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center">
          <AvatarFallback className="w-full h-full flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-200">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg p-2 animate-in fade-in zoom-in-95"
      >
        <div className="flex flex-col items-center gap-2 px-2 py-3">
          <div className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center justify-center font-medium shadow-inner">
            {avatarFallback}
          </div>
          <div className="text-center space-y-0.5">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
              {name || "User"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
              {email}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-1">
          <DropdownMenuItem
            onClick={() => logout()}
            disabled={isPending}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors cursor-pointer ${
              isPending
                ? "text-gray-500 dark:text-gray-400"
                : "text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
            }`}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogOut className="size-4" />
            )}
            {isPending ? "Signing out..." : "Sign out"}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
