"use client";

import { useWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-workspaces";
import { RiAddCircleFill } from "react-icons/ri";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { WorkSpaceAvatar } from "@/features/workspaces/components/workspace-avatar";
import { useRouter } from "next/navigation";
import { useWorkSpaceId } from "@/features/workspaces/hooks/use-workspace-id";

const WorkSpace = () => {
  const { open } = useWorkspaceModal();
  const { data: workspaces, isLoading } = useGetWorkspaces();
  const workspaceId = useWorkSpaceId();
  const router = useRouter();

  const hasWorkspaces = workspaces?.documents?.length > 0;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase text-muted-foreground">
          Workspaces
        </p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-muted-foreground hover:text-primary cursor-pointer"
        />
      </div>

      <Select onValueChange={(id) => router.push(`/workspaces/${id}`)}>
        <SelectTrigger>
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
    </div>
  );
};

export default WorkSpace;
