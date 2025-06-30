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
  const { mutate: logout, isPending } = useLogout(); // keep your logic

  if (isLoading) {
    return (
      <div className="size-9 flex items-center justify-center rounded-full bg-muted border border-border shadow-sm">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
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
        <Avatar className="size-9 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow duration-150 cursor-pointer flex items-center justify-center">
          <AvatarFallback className="w-full h-full flex items-center justify-center text-sm font-semibold text-neutral-700 dark:text-neutral-200">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 rounded-xl border border-border bg-white dark:bg-neutral-900 shadow-xl p-4 animate-in fade-in zoom-in-90"
      >
        <div className="flex flex-col items-center gap-3 mb-2">
          <div className="size-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold text-base shadow-sm">
            {avatarFallback}
          </div>
          <div className="text-center space-y-0.5">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              {name || "User"}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              {email}
            </p>
          </div>
        </div>

        <div className="mt-2 border-t border-border pt-2">
          <DropdownMenuItem
            onClick={() => logout()}
            disabled={isPending}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              isPending
                ? "text-muted-foreground opacity-70"
                : "text-destructive hover:bg-destructive/10"
            }`}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <LogOut className="size-4" />
            )}
            {isPending ? "Logging out..." : "Logout"}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
