"use client";

import { useParams } from "next/navigation";
import { Loader } from "lucide-react";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { Card, CardContent } from "@/components/ui/card";
import { useGetTaskById } from "../api/useGetTaskById";
import { EditTaskForm } from "./edit-task-from";

interface Props {
  taskId: string;
  onCancel: () => void;
}

export const EditTaskFormWrapper = ({ taskId, onCancel }: Props) => {
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const { data: task, isLoading: isLoadingTask } = useGetTaskById(taskId);
  const { data: projects } = useGetProjects(workspaceId);
  const { data: members } = useGetMembers(workspaceId);

  if (isLoadingTask || !task) {
    return (
      <Card className="w-full h-[714px] border-none shadow-none">
        <CardContent className="flex items-center justify-center h-full">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  const projectOptions =
    projects?.documents?.map((p) => ({
      id: p.$id,
      name: p.name,
    })) ?? [];

  const memberOptions =
    members?.map((m) => ({
      id: m.$id,
      name: m.name,
    })) ?? [];

  return (
    <EditTaskForm
      task={task}
      workspaceId={workspaceId}
      onCancel={onCancel}
      projectOptions={projectOptions}
      memberOptions={memberOptions}
    />
  );
};
