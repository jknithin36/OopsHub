"use client";

import { useWorkSpaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMemberRole } from "@/features/members/api/use-update-member";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";

const MemberList = ({ currentUserId }: { currentUserId: string | null }) => {
  const workspaceId = useWorkSpaceId();
  const router = useRouter();
  const { data, isLoading, isError } = useGetMembers(workspaceId);
  const deleteMember = useDeleteMember(currentUserId || "", {
    onSuccess: (deletedId) => {
      if (deletedId === currentUserId) {
        router.push("/");
      }
    },
  });
  const updateRole = useUpdateMemberRole();
  const [LeaveDialog, confirmLeave] = useConfirm(
    "Leave Workspace",
    "Are you sure you want to leave this workspace? You will lose access to all its content."
  );
  const [RemoveDialog, confirmRemove] = useConfirm(
    "Remove Member",
    "Are you sure you want to remove this member from the workspace?"
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError || !data || data.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No members found in this workspace.
      </div>
    );
  }

  return (
    <>
      <LeaveDialog />
      <RemoveDialog />
      <div className="flex flex-col gap-4 divide-y border rounded-lg bg-white dark:bg-muted p-2">
        {data.map((member) => {
          const isSelf = currentUserId === member.userId;
          const currentUserRole = data.find(
            (m) => m.userId === currentUserId
          )?.role;
          const canEdit = currentUserRole === "ADMIN";

          return (
            <div
              key={member.$id}
              className="flex items-center justify-between py-4 px-2 hover:bg-accent rounded-md transition"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={member.imageUrl} />
                  <AvatarFallback>
                    {member.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {member.name}{" "}
                    {isSelf && (
                      <span className="text-muted-foreground">(You)</span>
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {member.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={member.role === "ADMIN" ? "default" : "outline"}
                >
                  {member.role}
                </Badge>
                {member.role === "ADMIN" && (
                  <ShieldCheck className="w-4 h-4 text-primary" />
                )}

                {isSelf ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-800"
                    onClick={async () => {
                      const ok = await confirmLeave();
                      if (ok) {
                        deleteMember.mutate(member.$id);
                      }
                    }}
                  >
                    Leave
                  </Button>
                ) : (
                  canEdit && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive/80"
                        onClick={async () => {
                          const ok = await confirmRemove();
                          if (ok) deleteMember.mutate(member.$id);
                        }}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() =>
                          updateRole.mutate({
                            memberId: member.$id,
                            role: member.role === "ADMIN" ? "MEMBER" : "ADMIN",
                          })
                        }
                      >
                        Toggle Role
                      </Button>
                    </>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MemberList;
