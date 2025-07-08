import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { getWorkspaceById } from "@/features/workspaces/server/queries";
import { UpdateWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { DeleteWorkspaceCard } from "@/features/workspaces/components/delete-workspace-button";

interface WorkspaceIdSettingsPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdSettingsPage = async ({
  params,
}: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspace = await getWorkspaceById({ workspaceId: params.workspaceId });
  if (!workspace) redirect("/");

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">
          General Settings
        </h2>
        <UpdateWorkspaceForm workspace={workspace} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
        <DeleteWorkspaceCard />
      </section>
    </div>
  );
};

export default WorkspaceIdSettingsPage;
