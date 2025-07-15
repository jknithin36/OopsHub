import { getCurrent } from "@/features/auth/queries";
import { getProject } from "@/features/projects/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Calendar,
  Bell,
  CheckCircle,
  UserPlus,
  Rocket,
} from "lucide-react";
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          {project.imgUrl ? (
            <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
              <Image
                src={`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID}/files/${project.imgUrl}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`}
                alt={project.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center text-2xl">
              🚀
            </div>
          )}
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2">
              {project.name}
              <span className="text-lg">✨</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 flex items-center gap-1.5">
              <Rocket className="w-4 h-4" />
              <span>
                Manage tasks, track progress, and collaborate with your team
              </span>
            </p>
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          size="sm"
          className="gap-2 rounded-lg border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <Link
            href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}
          >
            <Pencil className="w-4 h-4" />
            <span>Edit Project</span>
          </Link>
        </Button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Upcoming Milestones
            </h3>
          </div>
          <ul className="space-y-3 pl-2">
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="text-green-500">✓</span>
              <span>Sprint Planning – July 15</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="text-yellow-500">⏳</span>
              <span>Initial Release – August 1</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="text-blue-500">🔜</span>
              <span>Feature Complete – August 15</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 group-hover:scale-105 transition-transform">
              <Bell className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Recent Activity
            </h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
              <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              <span>Task "UI Fixes" completed by Shiva</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
              <UserPlus className="w-4 h-4 mt-0.5 text-blue-500 flex-shrink-0" />
              <span>Varun joined the workspace</span>
            </li>
            <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
              <span className="text-purple-500">🔄</span>
              <span>New sprint started by Phani</span>
            </li>
          </ul>
        </div>
      </div>

      {/* View Switcher with Create Task */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
        <TaskViewSwitcher />
        <CreateTaskModal
          workspaceId={project.workspaceId}
          projectId={project.$id}
          assigneeId={user.$id}
          trigger={
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <span>+</span>
              <span>Create Task</span>
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default ProjectIdPage;
