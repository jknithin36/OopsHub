"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import { CreateTaskForm } from "./create-task-form";

// ✅ Local safe hook to get workspaceId as string
const useSafeWorkspaceId = (): string => {
  const params = useParams();
  const raw = (params as Record<string, string | string[]>)?.workspaceId;
  if (Array.isArray(raw)) return raw[0];
  return raw;
};

interface CreateFormWrapperProps {
  onCancel: () => void;
}

export const CreateTaskFormWrapper = ({ onCancel }: CreateFormWrapperProps) => {
  const workspaceId = useSafeWorkspaceId();
  const shouldFetch = Boolean(workspaceId);

  // Show spinner if workspaceId not ready
  if (!workspaceId) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  // ✅ Pass workspaceId as a string directly
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects(
    workspaceId,
    { enabled: shouldFetch }
  );

  const { data: members, isLoading: isLoadingMembers } = useGetMembers(
    workspaceId,
    { enabled: shouldFetch }
  );

  const isLoading = isLoadingProjects || isLoadingMembers;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  // ✅ SAFELY map data only if it’s an array
  const projectOptions = Array.isArray(projects?.documents)
    ? projects.documents.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl,
      }))
    : [];
  const memberOptions = Array.isArray(members)
    ? members.map((member) => ({
        id: member.$id,
        name: member.name,
      }))
    : [];

  return (
    <div>
      <CreateTaskForm
        onCancel={onCancel}
        projectOptions={projectOptions}
        memberOptions={memberOptions}
        workspaceId={workspaceId}
      />
    </div>
  );
};
