"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkSpaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useProjectModal } from "@/features/projects/hooks/use-create-project-modal"; // ✅ import modal hook

const Projects = () => {
  const pathname = usePathname();
  const workspaceId = useWorkSpaceId();
  const { data } = useGetProjects(workspaceId);
  const { open } = useProjectModal(); // ✅ get open function

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase text-muted-foreground">
          Projects
        </p>
        <RiAddCircleFill
          className="size-5 text-muted-foreground hover:text-primary cursor-pointer"
          onClick={open} // ✅ open modal on click
        />
      </div>

      {/* Project List */}
      <div className="space-y-1">
        {data?.documents?.map((project) => {
          const isActive =
            pathname === `/workspaces/${workspaceId}/projects/${project.$id}`;

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
              {project.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
