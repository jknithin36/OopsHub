import { getCurrent } from "@/features/auth/queries";
import { DeleteProjectButton } from "@/features/projects/components/delete-project";
import { UpdateProjectForm } from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";

interface ProjectSettingsPageProps {
  params: {
    projectId: string;
  };
}

const ProjectSettingsPage = async ({ params }: ProjectSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const project = await getProject({ projectId: params.projectId });
  if (!project) redirect("/");

  return (
    <div className="max-w-2xl mx-auto py-12 space-y-10 px-4">
      {/* General Settings */}
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Project Settings
        </h1>
        <UpdateProjectForm
          projectId={params.projectId}
          initialValues={{
            $id: project.$id,
            name: project.name,
            imgUrl: project.imgUrl,
            workspaceId: project.workspaceId,
          }}
        />
      </div>

      {/* Danger Zone */}
      <div className="border-t pt-10 space-y-6">
        <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
        <p className="text-sm text-muted-foreground">
          Deleting your project is irreversible. Please proceed with caution.
        </p>
        <DeleteProjectButton
          projectId={project.$id}
          workspaceId={project.workspaceId}
        />
      </div>
    </div>
  );
};

export default ProjectSettingsPage;
