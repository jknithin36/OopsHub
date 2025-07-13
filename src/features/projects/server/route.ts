import { DATABASE_ID, IMAGES_BUCKET_ID, PROJECTS_ID } from "@/config";
import { getMember } from "@/features/members/utils";
import { sessionMiddleware } from "@/lib/session-middleware";
import { zValidator } from "@hono/zod-validator";
import { error } from "console";
import { Hono } from "hono";
import { ID, Permission, Query, Role } from "node-appwrite";
import { z } from "zod";
import { createProjectSchema, updateProjectSchema } from "../schema";
import { MemberRole } from "@/features/members/types";

const app = new Hono();

app
  // .post(
  //   "/",
  //   sessionMiddleware,
  //   zValidator("form", createProjectSchema),
  //   async (c) => {
  //     const { name, image, workspaceId } = c.req.valid("form");
  //     const databases = c.get("databases");
  //     const storage = c.get("storage");
  //     const user = c.get("user");

  //     // ✅ Check if user is a member of the workspace
  //     const member = await getMember({
  //       databases,
  //       workspaceId,
  //       userId: user.$id,
  //     });

  //     if (!member) {
  //       return c.json({ error: "Unauthorized" }, 403);
  //     }

  //     // ✅ Upload image if provided
  //     let imgUrl: string | undefined;
  //     if (image instanceof File) {
  //       const file = await storage.createFile(
  //         IMAGES_BUCKET_ID,
  //         ID.unique(),
  //         image,
  //         [Permission.read(Role.any())]
  //       );
  //       imgUrl = file.$id;
  //     }

  //     // ✅ Create project
  //     const project = await databases.createDocument(
  //       DATABASE_ID,
  //       PROJECTS_ID,
  //       ID.unique(),
  //       {
  //         name,
  //         workspaceId,
  //         imgUrl,
  //         userId: user.$id,
  //       },
  //       [Permission.read(Role.any()), Permission.update(`user:${user.$id}`)]
  //     );

  //     return c.json({ success: true, data: project });
  //   }
  // )
  .post(
    "/",
    sessionMiddleware,
    zValidator("form", createProjectSchema),
    async (c) => {
      const formData = await c.req.formData();
      const name = formData.get("name")?.toString().trim();
      const workspaceId = formData.get("workspaceId")?.toString().trim();
      const file = formData.get("image") as File;

      if (!name || !workspaceId) {
        return c.json(
          {
            success: false,
            error: {
              name: "ValidationError",
              issues: [
                { path: ["name"], message: "Project name is required" },
                { path: ["workspaceId"], message: "Workspace ID is required" },
              ],
            },
          },
          400
        );
      }

      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      let imgUrl: string | null = null;

      if (file instanceof File) {
        const uploaded = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          file,
          [Permission.read(Role.any())]
        );
        imgUrl = uploaded?.$id ?? null;
      }

      const project = await databases.createDocument(
        DATABASE_ID,
        PROJECTS_ID,
        ID.unique(),
        {
          name,
          workspaceId,
          imgUrl,
        },
        [Permission.read(Role.any()), Permission.update(`user:${user.$id}`)]
      );

      return c.json({ success: true, data: project });
    }
  )

  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
      })
    ),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { workspaceId } = c.req.valid("query");

      if (!workspaceId) {
        return c.json({ error: "Missing WorkspaceId" }, 400);
      }

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const projects = await databases.listDocuments(DATABASE_ID, PROJECTS_ID, [
        Query.equal("workspaceId", workspaceId),
        Query.orderDesc("$createdAt"),
      ]);

      // your logic here...

      return c.json({ data: projects });
    }
  )
  .patch(
    "/:projectId",
    sessionMiddleware,
    zValidator("form", updateProjectSchema),
    async (c) => {
      const projectId = c.req.param("projectId");
      const { name, image, workspaceId } = c.req.valid("form");

      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const project = await databases.getDocument(
        DATABASE_ID,
        PROJECTS_ID,
        projectId
      );

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member || member.role !== MemberRole.ADMIN) {
        return c.json({ error: "Unauthorized" }, 403);
      }

      let uploadedImageId: string | null = null;
      if (image instanceof File) {
        const uploaded = await storage.createFile(
          IMAGES_BUCKET_ID,
          ID.unique(),
          image,
          [Permission.read(Role.any())]
        );
        uploadedImageId = uploaded?.$id ?? null;
      }

      const updated = await databases.updateDocument(
        DATABASE_ID,
        PROJECTS_ID,
        projectId,
        {
          ...(name ? { name } : {}),
          ...(uploadedImageId ? { imgUrl: uploadedImageId } : {}),
        }
      );

      return c.json({ data: updated });
    }
  )
  .delete("/:projectId", sessionMiddleware, async (c) => {
    const { projectId } = c.req.param();
    const databases = c.get("databases");
    const user = c.get("user");

    const project = await databases.getDocument(
      DATABASE_ID,
      PROJECTS_ID,
      projectId
    );

    const member = await getMember({
      databases,
      workspaceId: project.workspaceId,
      userId: user.$id,
    });

    if (!member || member.role !== MemberRole.ADMIN) {
      return c.json({ error: "Unauthorized" }, 403);
    }

    await databases.deleteDocument(DATABASE_ID, PROJECTS_ID, projectId);

    return c.json({ data: { $id: projectId } });
  });

export default app;
