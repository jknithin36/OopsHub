"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { WorkSpaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { useRouter } from "next/navigation";
import { useWorkSpaceId } from "@/features/workspaces/hooks/use-workspace-id";

const WorkSpaceSwitcher = () => {
  const { data: workspaces, isLoading } = useGetWorkspaces();
  const workspaceId = useWorkSpaceId();
  const router = useRouter();

  const hasWorkspaces = workspaces?.documents?.length > 0;
  const current =
    workspaces?.documents?.find((w) => w.$id === workspaceId) ||
    workspaces?.documents?.[0];

  return (
    <Select
      onValueChange={(id) => router.push(`/workspaces/${id}`)}
      value={current?.$id}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={
            isLoading
              ? "Loading..."
              : hasWorkspaces
              ? current?.name
              : "No workspaces"
          }
        />
      </SelectTrigger>
      <SelectContent>
        {hasWorkspaces &&
          workspaces.documents.map((workspace) => (
            <SelectItem key={workspace.$id} value={workspace.$id}>
              <div className="flex items-center gap-2">
                <WorkSpaceAvatar
                  name={workspace.name}
                  image={workspace.imageUrl}
                />
                <span>{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default WorkSpaceSwitcher;
