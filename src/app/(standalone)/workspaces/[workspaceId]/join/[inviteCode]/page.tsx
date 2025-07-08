// app/(standalone)/workspaces/[workspaceId]/join/[inviteCode]/page.tsx
"use server";

import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { getWorkSpaceInfo } from "@/features/workspaces/server/queries";
import { JoinWorkspaceClient } from "@/features/workspaces/components/join-workspace-client";

interface JoinPageProps {
  params: {
    workspaceId: string;
    inviteCode: string;
  };
}

export default async function JoinPage({ params }: JoinPageProps) {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspace = await getWorkSpaceInfo(params.workspaceId);
  if (!workspace) redirect("/404");

  return (
    <div className="max-w-xl mx-auto px-6 py-12 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">
          You've been invited to join:
        </h1>
        <p className="text-lg text-muted-foreground">
          <span className="font-medium text-primary">{workspace.name}</span>
        </p>
      </div>

      <JoinWorkspaceClient
        workspaceId={params.workspaceId}
        inviteCode={params.inviteCode}
      />
    </div>
  );
}
