import { Hono } from "hono";
import { sessionMiddleware } from "@/lib/session-middleware";
import {
  DATABASE_ID,
  IMAGES_BUCKET_ID,
  MEMBERS_ID,
  WORKSPACES_ID,
} from "@/config";
import { ID, Permission, Role, Query } from "node-appwrite";
import { MemberRole } from "@/features/members/types";
import { generateInviteCode } from "@/lib/utils";
import { getMember } from "@/features/members/utils";

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

    const workspaceIds = members.documents.map((m) => m.workspaceId);
    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
      [Query.contains("$id", workspaceIds), Query.orderDesc("$createdAt")]
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
    const inviteCode = generateInviteCode(7);

    let uploadedImageUrl: string | null = null;

    if (file instanceof File) {
      const uploaded = await storage.createFile(
        IMAGES_BUCKET_ID,
        ID.unique(),
        file,
        [Permission.read(Role.any())]
      );
      uploadedImageUrl = uploaded?.$id ?? null;
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

    await databases.createDocument(DATABASE_ID, MEMBERS_ID, ID.unique(), {
      userId: user.$id,
      workspaceId: workspace.$id,
      role: MemberRole.ADMIN,
    });

    return c.json({ success: true, data: workspace });
  })

  .patch("/:workspaceId", sessionMiddleware, async (c) => {
    const workspaceId = c.req.param("workspaceId");
    const databases = c.get("databases");
    const storage = c.get("storage");
    const user = c.get("user");

    const body = await c.req.parseBody();
    const name = body.name?.toString().trim();
    const file = body.image as File;

    if (!name) return c.json({ error: "Name is required" }, 400);

    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    });

    if (!member || member.role !== MemberRole.ADMIN) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    let uploadedImageUrl: string | null = null;
    if (file instanceof File) {
      const result = await storage.createFile(
        IMAGES_BUCKET_ID,
        ID.unique(),
        file,
        [Permission.read(Role.any())]
      );
      uploadedImageUrl = result?.$id || null;
    }

    const workspace = await databases.updateDocument(
      DATABASE_ID,
      WORKSPACES_ID,
      workspaceId,
      {
        name,
        ...(uploadedImageUrl ? { imageUrl: uploadedImageUrl } : {}),
      }
    );

    return c.json({ data: workspace });
  });

export default app;
