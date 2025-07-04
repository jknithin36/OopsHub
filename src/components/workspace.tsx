"use client";

import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { RiAddCircleFill } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WorkSpaceAvatar } from "@/features/workspaces/components/workspace-avatar";

const WorkSpace = () => {
  const { data: workspaces, isLoading } = useGetWorkspaces();

  const hasWorkspaces = workspaces?.documents?.length > 0;

  return (
    <div className="flex flex-col gap-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase text-muted-foreground tracking-wide">
          Workspaces
        </p>
        <RiAddCircleFill
          className="size-5 text-muted-foreground hover:text-primary transition cursor-pointer"
          title="Create Workspace"
        />
      </div>

      {/* Selector */}
      <Select>
        <SelectTrigger className="bg-neutral-100 hover:bg-neutral-200 text-sm px-3 py-2 rounded-md border border-neutral-300 focus:ring-2 focus:ring-primary focus:outline-none transition w-full">
          <SelectValue
            placeholder={
              isLoading
                ? "Loading..."
                : hasWorkspaces
                ? "Select workspace"
                : "No workspaces"
            }
          />
        </SelectTrigger>
        <SelectContent className="bg-white border border-neutral-300 rounded-md shadow-md max-h-60 overflow-y-auto">
          {hasWorkspaces ? (
            workspaces.documents.map((workspace) => (
              <SelectItem
                key={workspace.$id}
                value={workspace.$id}
                className="text-sm px-3 py-2 cursor-pointer hover:bg-neutral-100"
              >
                <div className="flex items-center gap-2 truncate font-medium">
                  <WorkSpaceAvatar
                    name={workspace.name}
                    image={workspace.imageUrl}
                  />
                  <span className="truncate">{workspace.name}</span>
                </div>
              </SelectItem>
            ))
          ) : (
            <div className="text-xs text-muted-foreground px-3 py-2">
              No workspaces found
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default WorkSpace;
