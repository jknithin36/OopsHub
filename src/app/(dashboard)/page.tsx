import { getCurrent } from "@/features/auth/actions";
import { getWorkSpaces } from "@/features/workspaces/server/actions";
// import { CreateWorkSpaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const workspaces = await getWorkSpaces();

  if (workspaces.total === 0) {
    redirect("/workspaces/create");
  } else {
    redirect(`/workspaces/${workspaces.documents[0].$id}`);
  }
}
