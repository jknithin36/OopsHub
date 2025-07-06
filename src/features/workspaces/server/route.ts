// import { zValidator } from "@hono/zod-validator";
// import { Hono } from "hono";
// import { createWorkspaceSchema } from "../schemas";
// import { sessionMiddleware } from "@/lib/session-middleware";
// import { DATABASE_ID, IMAGES_BUCKET_ID, WORKSPACES_ID } from "@/config";
// import { ID } from "node-appwrite";

// const app = new Hono();

// app.post(
//   "/",
//   zValidator("form", createWorkspaceSchema),
//   sessionMiddleware,
//   async (c) => {
//     const databases = c.get("databases");
//     const user = c.get("user");
//     const storage = c.get("storage");
//     const { name, image } = c.req.valid("form");

//     let uploadedImageUrl: string | undefined;

//     // ✅ If image is a valid base64 data URL
//     if (image && typeof image === "string" && image.startsWith("data:image/")) {
//       try {
//         const base64Data = image.split(",")[1];
//         const mimeType = image.match(/data:(.*?);base64/)?.[1] || "image/png";
//         const buffer = Buffer.from(base64Data, "base64");

//         const file = await storage.createFile(
//           IMAGES_BUCKET_ID,
//           ID.unique(),
//           new File([buffer], "workspace.png", { type: mimeType })
//         );

//         uploadedImageUrl = file ? file.$id : undefined;
//       } catch (error) {
//         console.error("Image upload failed:", error);
//       }
//     }

//     const workspace = await databases.createDocument(
//       DATABASE_ID,
//       WORKSPACES_ID,
//       ID.unique(),
//       {
//         name,
//         userId: user.$id,
//         imageUrl: uploadedImageUrl ?? null,
//       }
//     );

//     return c.json({ data: workspace });
//   }
// );

// export default app;
import { Hono } from "hono";
import { sessionMiddleware } from "@/lib/session-middleware";
import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBERS_ID,
  WORKSPACES_ID,
} from "@/config";
import { ID, Permission, Query, Role } from "node-appwrite";
import { MemberRole } from "@/features/members/types";
import { generateInviteCode } from "@/lib/utils";

const app = new Hono();

app
  .get("/", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("userId", user.$id),
    ]);

    if (members.total === 0) {
      return c.json({ data: { documents: [], total: 0 } });
    }

    const workspaceIds = members.documents.map((member) => member.workspaceId);
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.orderDesc("$createdAt"), Query.contains("$id", workspaceIds)]
    );

    return c.json({ data: workspaces });
  })
  .post("/", sessionMiddleware, async (c) => {
    const body = await c.req.parseBody();
    const name = body.name?.toString().trim();
    const file = body.image as File;

    if (!name) {
      return c.json(
        {
          success: false,
          error: {
            name: "ValidationError",
            issues: [{ path: ["name"], message: "Workspace name is required" }],
          },
        },
        400
      );
    }

    const databases = c.get("databases");
    const storage = c.get("storage");
    const user = c.get("user");

    let uploadedImageUrl: string | null = null;
    const inviteCode: string = generateInviteCode(7);
    if (file instanceof File) {
      const result = await storage.createFile(
        IMAGES_BUCKET_ID,
        ID.unique(),
        file,
        [Permission.read(Role.any())]
      );
      uploadedImageUrl = result?.$id || null;
    }

    const workspace = await databases.createDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      ID.unique(),
      {
        name,
        userId: user.$id,
        imageUrl: uploadedImageUrl,
        inviteCode,
      },
      [Permission.read(Role.any()), Permission.update(`user:${user.$id}`)]
    );

    // ✅ Add logged-in user to the members collection
    await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
      userId: user.$id,
      workspaceId: workspace.$id,
      role: MemberRole.ADMIN, // Will be "ADMIN"
    });

    return c.json({ success: true, data: workspace });
  });
export default app;
