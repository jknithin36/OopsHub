"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkSpaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getImageUrl } from "@/lib/get-image-url";

const Projects = () => {
  const pathname = usePathname();
  const workspaceId = useWorkSpaceId();
  const { data } = useGetProjects(workspaceId);
  const { open } = useProjectModal();

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase text-muted-foreground">
          Projects
        </p>
        <RiAddCircleFill
          className="size-5 text-muted-foreground hover:text-primary cursor-pointer"
          onClick={open}
        />
      </div>

      {/* Project List */}
      <div className="space-y-1">
        {data?.documents?.map((project) => {
          const isActive =
            pathname === `/workspaces/${workspaceId}/projects/${project.$id}`;
          const imageUrl = getImageUrl(project.imgUrl); // 🖼️ from Appwrite fileId

          return (
            <Link
              key={project.$id}
              href={`/workspaces/${workspaceId}/projects/${project.$id}`}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {/* Avatar */}
              <Avatar className="h-5 w-5">
                <AvatarImage src={imageUrl || undefined} alt={project.name} />
                <AvatarFallback>
                  {project.name?.slice(0, 2)?.toUpperCase() ?? "PR"}
                </AvatarFallback>
              </Avatar>

              {/* Project Name */}
              <span className="truncate">{project.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
