import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";
import TaskViewSwitcher from "@/features/tasks/components/task-view-switcher";
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal";

interface ProjectIdPageProps {
  params: { projectId: string };
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const project = await getProject({ projectId: params.projectId });
  if (!project) redirect("/");

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          {project.imgUrl && (
            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-muted">
              <Image
                src={`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID}/files/${project.imgUrl}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {project.name}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage tasks, track progress, and collaborate with your team.
            </p>
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          className="h-9 rounded-md border border-input hover:bg-accent hover:text-accent-foreground"
        >
          <Link
            href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Pencil className="w-4 h-4" />
            Edit Project
          </Link>
        </Button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-muted/50 p-6 rounded-xl border border-border shadow-sm">
          <h3 className="font-semibold text-lg mb-3"> Milestones</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Sprint Planning – July 15</li>
            <li>Initial Release – August 1</li>
          </ul>
        </div>

        <div className="bg-muted/50 p-6 rounded-xl border border-border shadow-sm">
          <h3 className="font-semibold text-lg mb-3"> Recent Updates</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Task "UI Fixes" moved to Done</li>
            <li>• Bob joined the workspace</li>
          </ul>
        </div>
      </div>

      {/* View Switcher */}
      <div className="pt-4">
        <TaskViewSwitcher />
      </div>

      {/* ✅ Mount CreateTaskModal here */}
      <CreateTaskModal
        workspaceId={project.workspaceId}
        projectId={project.$id}
        assigneeId={user.$id}
      />
    </div>
  );
};

export default ProjectIdPage;
