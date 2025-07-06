// app/workspaces/create/page.tsx
import { getCurrent } from "@/features/auth/actions";
import { NewWorkSpace } from "@/features/workspaces/components/new-workspace";
import { redirect } from "next/navigation";

const WorkSpaceCreatePage = async () => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  return <NewWorkSpace />;
};

export default WorkSpaceCreatePage;
