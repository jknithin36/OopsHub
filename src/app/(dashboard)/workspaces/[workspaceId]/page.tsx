import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import React from "react";

const WorkSpaceId = async () => {
  // const user = await getCurrent();

  // if (user) redirect("/");

  const user = await getCurrent();
  if (!user) redirect("/");
  return <div>WorkSpaceId</div>;
};

export default WorkSpaceId;
