import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { sessionMiddleware } from "@/lib/session-middleware";
import { createAdminClient } from "@/lib/appwrite";
import { getMember } from "../utils";
import { DATABASE_ID, MEMBERS_ID } from "@/config";
import { MemberRole } from "../types";
import { Query } from "node-appwrite";

const app = new Hono();

app.get(
  "/",
  sessionMiddleware,
  zValidator("query", z.object({ workspaceId: z.string() })),
  async (c) => {
    const { users } = await createAdminClient();
    const databases = c.get("databases");
    const user = c.get("user");
    const { workspaceId } = c.req.valid("query");

    const member = await getMember({
      databases,
      workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("workspaceId", workspaceId),
    ]);

    const populatedMembers = await Promise.all(
      members.documents.map(async (member) => {
        const user = await users.get(member.userId);
        return {
          ...member,
          name: user.name,
          email: user.email,
        };
      })
    );

    return c.json({
      data: {
        ...members,
        documents: populatedMembers,
      },
    });
  }
);

app.delete("/:memberId", sessionMiddleware, async (c) => {
  const { memberId } = c.req.param();
  const user = c.get("user");
  const databases = c.get("databases");

  const memberToDelete = await databases.getDocument(
    DATABASE_ID,
    MEMBERS_ID,
    memberId
  );

  const allMembersInWorkspace = await databases.listDocuments(
    DATABASE_ID,
    MEMBERS_ID,
    [Query.equal("workspaceId", memberToDelete.workspaceId)]
  );

  if (allMembersInWorkspace.total === 1) {
    return c.json(
      { error: "Cannot delete the only member in the workspace." },
      400
    );
  }

  const currentMember = await getMember({
    databases,
    workspaceId: memberToDelete.workspaceId,
    userId: user.$id,
  });

  if (!currentMember) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const isSelf = currentMember.$id === memberToDelete.$id;
  const isAdmin = currentMember.role === MemberRole.ADMIN;

  if (!isSelf && !isAdmin) {
    return c.json({ error: "Only admins can remove other members." }, 403);
  }

  await databases.deleteDocument(DATABASE_ID, MEMBERS_ID, memberId);

  return c.json({ data: { $id: memberId } });
});

app.patch(
  "/:memberId",
  sessionMiddleware,
  zValidator("json", z.object({ role: z.nativeEnum(MemberRole) })),
  async (c) => {
    const { memberId } = c.req.param();
    const { role } = c.req.valid("json");

    const user = c.get("user");
    const databases = c.get("databases");

    const memberToUpdate = await databases.getDocument(
      DATABASE_ID,
      MEMBERS_ID,
      memberId
    );

    const currentMember = await getMember({
      databases,
      workspaceId: memberToUpdate.workspaceId,
      userId: user.$id,
    });

    if (!currentMember || currentMember.role !== MemberRole.ADMIN) {
      return c.json({ error: "Only admins can change roles." }, 403);
    }

    const allMembers = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [
      Query.equal("workspaceId", memberToUpdate.workspaceId),
    ]);

    const adminCount = allMembers.documents.filter(
      (m) => m.role === MemberRole.ADMIN
    ).length;

    const isSelf = memberToUpdate.$id === currentMember.$id;
    const isDemotingAdmin =
      memberToUpdate.role === MemberRole.ADMIN && role !== MemberRole.ADMIN;

    if (adminCount === 1 && isDemotingAdmin) {
      return c.json(
        { error: "You cannot remove the last admin from the workspace." },
        400
      );
    }

    const updated = await databases.updateDocument(
      DATABASE_ID,
      MEMBERS_ID,
      memberId,
      { role }
    );

    return c.json({ data: updated });
  }
);

export default app;
