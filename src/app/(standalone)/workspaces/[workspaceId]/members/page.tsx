import { getCurrent } from "@/features/auth/queries";
import MemberList from "@/features/members/component/member-list";
import { redirect } from "next/navigation";

const WorkSpaceIdMembersPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold text-foreground">
          Workspace Members
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage who has access to this workspace.
        </p>
      </header>

      <section>
        <MemberList currentUserId={user.$id} />
      </section>
    </div>
  );
};

export default WorkSpaceIdMembersPage;
