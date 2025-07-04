"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { getImageUrl } from "@/lib/get-image-url";

const WorkSpaceSwitcher = () => {
  const { data, isLoading, isError } = useGetWorkspaces();
  const [selected, setSelected] = useState<any>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading workspaces</div>;

  const workspaces = data.documents;
  const current = selected || workspaces[0];

  if (!workspaces.length) {
    return (
      <Button variant="outline" className="gap-2">
        <Plus className="h-4 w-4" />
        Add Workspace
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-3 py-2 rounded-2xl shadow-sm"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={getImageUrl(current.imageUrl)}
              alt={current.name}
              className="object-cover"
            />
            <AvatarFallback className="text-xs font-bold">
              {current.name?.[0]?.toUpperCase() ?? "W"}
            </AvatarFallback>
          </Avatar>
          <span className="truncate">{current.name}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-60 mt-2">
        {workspaces.map((workspace) => {
          const isActive = workspace.$id === current.$id;
          return (
            <DropdownMenuItem
              key={workspace.$id}
              onClick={() => setSelected(workspace)}
              className={`flex gap-3 items-center py-2 px-3 rounded-xl transition-all cursor-pointer ${
                isActive ? "bg-muted font-semibold" : "hover:bg-accent"
              }`}
            >
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={getImageUrl(workspace.imageUrl)}
                  alt={workspace.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-xs font-bold">
                  {workspace.name?.[0]?.toUpperCase() ?? "W"}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm flex-1">{workspace.name}</span>
              {isActive && <Check className="h-4 w-4 text-muted-foreground" />}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuItem className="flex gap-2 items-center text-muted-foreground mt-2">
          <Plus className="h-4 w-4" />
          <span>Add Workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkSpaceSwitcher;
