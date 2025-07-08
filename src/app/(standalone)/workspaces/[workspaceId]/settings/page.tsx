import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { getWorkspaceById } from "@/features/workspaces/server/queries";
import { UpdateWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { DeleteWorkspaceCard } from "@/features/workspaces/components/delete-workspace-button";
import { ResetInviteCodeCard } from "@/features/workspaces/components/reset-invite-card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
      <div className="mb-4">
        <Link href="/" passHref>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Workspace Settings
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage workspace details, invite code, and dangerous actions.
          </p>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-foreground">General</h2>
        <UpdateWorkspaceForm workspace={workspace} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-foreground">Invite Code</h2>
        <ResetInviteCodeCard inviteCode={workspace.inviteCode} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium text-destructive">Danger Zone</h2>
        <DeleteWorkspaceCard />
      </section>
    </div>
  );
};

export default WorkspaceIdSettingsPage;
