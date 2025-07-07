import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { UpdateWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { getWorkspaceById } from "@/features/workspaces/server/queries";

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

  const initialValues = await getWorkspaceById({
    workspaceId: params.workspaceId,
  });

  if (!initialValues) {
    redirect(`/workspaces/${params.workspaceId}`);
  }

  return (
    <div>
      <UpdateWorkspaceForm workspace={initialValues} />
    </div>
  );
};

export default WorkspaceIdSettingsPage;
