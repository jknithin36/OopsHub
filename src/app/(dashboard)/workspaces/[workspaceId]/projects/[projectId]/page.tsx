import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Link from "next/link";

interface ProjectIdPageProps {
  params: { projectId: string };
}

const ProjectIdPage = async ({ params }: ProjectIdPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const project = await getProject({ projectId: params.projectId });
  if (!project) redirect("/");

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Left: Avatar + Text */}
        <div className="flex items-center gap-4">
          {project.imgUrl && (
            <div className="relative w-16 h-16 rounded-md overflow-hidden border">
              <Image
                src={`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID}/files/${project.imgUrl}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`}
                alt={project.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-sm text-muted-foreground">
              Manage tasks, track progress, and collaborate with your team.
            </p>
          </div>
        </div>

        {/* Right: Edit Button */}
        <Button asChild variant="outline" className="flex items-center gap-2">
          <Link
            href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Link>
        </Button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-2">📅 Milestones</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Sprint Planning – July 15</li>
            <li>Initial Release – August 1</li>
          </ul>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-2">📌 Recent Updates</h3>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Task "UI Fixes" moved to Done</li>
            <li>• Bob joined the workspace</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectIdPage;
