import { createSessionClient } from "@/lib/appwrite";
import { getMember } from "../members/utils";
import { DATABASE_ID, PROJECTS_ID } from "@/config";
import { Project } from "./types";

export const getProject = async ({ projectId }: { projectId: string }) => {
  try {
    const { databases, account } = await createSessionClient();
    const user = await account.get();

    const project = await databases.getDocument<Project>(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );

    const member = await getMember({
      databases,
      userId: user.$id,
      workspaceId: project.workspaceId,
    });

    if (!member) {
      console.warn("⚠️ Unauthorized access attempt to project:", projectId);
      throw new Error("User is not authorized to access this project");
    }

    return project;
  } catch (error) {
    console.error("❌ Failed to fetch project:", error);
    throw error; // ✅ Rethrow so that error.tsx displays
  }
};
