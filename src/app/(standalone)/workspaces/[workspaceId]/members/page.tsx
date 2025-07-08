import { getCurrent } from "@/features/auth/queries";
import MemberList from "@/features/members/component/member-list";
import { redirect } from "next/navigation";
import { MemberListHeader } from "@/features/members/component/member-list-header"; // 👈 import this

const WorkSpaceIdMembersPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="p-6 space-y-6">
      <MemberListHeader /> {/* 👈 client-side Go Back button */}
      <div>
        <h1 className="text-2xl font-semibold">Workspace Members</h1>
        <p className="text-muted-foreground text-sm">
          Manage who has access to this workspace.
        </p>
      </div>
      <MemberList currentUserId={user.$id} />
    </div>
  );
};

export default WorkSpaceIdMembersPage;
