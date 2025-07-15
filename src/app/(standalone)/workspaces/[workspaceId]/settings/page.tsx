import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { getWorkspaceById } from "@/features/workspaces/server/queries";
import { UpdateWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { DeleteWorkspaceCard } from "@/features/workspaces/components/delete-workspace-button";
import { ResetInviteCodeCard } from "@/features/workspaces/components/reset-invite-card";

interface WorkspaceIdSettingsPageProps {
  params: { workspaceId: string };
}

const WorkspaceIdSettingsPage = async ({
  params,
}: WorkspaceIdSettingsPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspace = await getWorkspaceById({ workspaceId: params.workspaceId });
  if (!workspace) redirect("/");

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      {/* Page Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">
          Workspace Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage workspace details, invite access, and remove workspace.
        </p>
      </header>

      {/* General Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-medium text-foreground">General</h2>
          <p className="text-sm text-muted-foreground">
            Update workspace name and logo.
          </p>
        </div>
        <UpdateWorkspaceForm workspace={workspace} />
      </section>

      {/* Invite Code Section */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-medium text-foreground">Invite Code</h2>
          <p className="text-sm text-muted-foreground">
            Share this code to invite members to the workspace.
          </p>
        </div>
        <ResetInviteCodeCard inviteCode={workspace.inviteCode} />
      </section>

      {/* Danger Zone */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-medium text-destructive">Danger Zone</h2>
          <p className="text-sm text-muted-foreground">
            Proceed with caution — this will permanently delete your workspace.
          </p>
        </div>
        <DeleteWorkspaceCard />
      </section>
    </div>
  );
};

export default WorkspaceIdSettingsPage;
