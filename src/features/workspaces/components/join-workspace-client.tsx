"use client";

import { useRouter } from "next/navigation";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn } from "lucide-react";

interface JoinWorkspaceClientProps {
  workspaceId: string;
  inviteCode: string;
}

export const JoinWorkspaceClient = ({
  workspaceId,
  inviteCode,
}: JoinWorkspaceClientProps) => {
  const router = useRouter();

  const { mutate, isPending } = useJoinWorkspace({
    onSuccess: (data) => {
      // Redirect to the workspace or dashboard
      router.push(`/workspaces/${workspaceId}`);
    },
  });

  const handleJoin = () => {
    mutate({ workspaceId, code: inviteCode });
  };

  return (
    <Button onClick={handleJoin} disabled={isPending} className="w-full">
      {isPending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Joining...
        </>
      ) : (
        <>
          <LogIn className="w-4 h-4 mr-2" />
          Confirm & Join Workspace
        </>
      )}
    </Button>
  );
};
