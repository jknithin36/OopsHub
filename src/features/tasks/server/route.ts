import { Hono } from "hono";
import { z } from "zod";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";

import { sessionMiddleware } from "@/lib/session-middleware";
import { getMember } from "@/features/members/utils";
import { DATABASE_ID, TASKS_ID, PROJECTS_ID, MEMBERS_ID } from "@/config";
import { createTaskSchema } from "../schemas";
import { Task, TaskStatus } from "../types";
import { createAdminClient } from "@/lib/appwrite";
import { error } from "console";
import { da } from "date-fns/locale";

const app = new Hono()
  // ✅ CREATE TASK
  .post(
    "/",
    sessionMiddleware,
    zValidator("json", createTaskSchema),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");

      const {
        name,
        status,
        workspaceId,
        projectId,
        dueDate,
        assigneeId,
        description,
      } = c.req.valid("json");

      const member = await getMember({
        databases,
        workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const highestPositionTask = await databases.listDocuments(
        DATABASE_ID,
        TASKS_ID,
        [
          Query.equal("status", status),
          Query.equal("workspaceId", workspaceId),
          Query.orderDesc("position"),
          Query.limit(1),
        ]
      );

      const newPosition =
        highestPositionTask.documents.length > 0
          ? highestPositionTask.documents[0].position + 1000
          : 1000;

      const task = await databases.createDocument(
        DATABASE_ID,
        TASKS_ID,
        ID.unique(),
        {
          name,
          status,
          workspaceId,
          projectId,
          dueDate,
          assigneeId,
          position: newPosition,
          description,
        }
      );

      return c.json({ task }, 201);
    }
  )
  .get(
    "/",
    sessionMiddleware,
    zValidator(
      "query",
      z.object({
        workspaceId: z.string(),
        projectId: z.string(),
        assigneeId: z.string().optional(),
        status: z.nativeEnum(TaskStatus).optional(),
        search: z.string().optional(),
        dueDate: z.string().optional(),
      })
    ),
    async (c) => {
      try {
        const databases = c.get("databases");
        const user = c.get("user");
        const { users } = await createAdminClient();

        const { workspaceId, projectId, assigneeId, status, search, dueDate } =
          c.req.valid("query");

        const member = await getMember({
          databases,
          workspaceId,
          userId: user.$id,
        });

        if (!member) {
          return c.json({ error: "Unauthorized" }, 401);
        }

        const queries = [
          Query.equal("workspaceId", workspaceId),
          Query.equal("projectId", projectId),
        ];

        if (typeof assigneeId === "string" && assigneeId.trim() !== "") {
          queries.push(Query.equal("assigneeId", assigneeId));
        }
        if (typeof status === "string" && status.trim() !== "") {
          queries.push(Query.equal("status", status));
        }
        if (typeof dueDate === "string" && dueDate.trim() !== "") {
          queries.push(Query.equal("dueDate", dueDate));
        }
        if (typeof search === "string" && search.trim() !== "") {
          queries.push(Query.search("name", search));
        }

        queries.push(Query.orderAsc("position"));

        const tasks = await databases.listDocuments<Task>(
          DATABASE_ID,
          TASKS_ID,
          queries
        );
        const taskDocs = tasks.documents;

        const projectIds = [
          ...new Set(taskDocs.map((t) => t.projectId).filter(Boolean)),
        ];
        const assigneeIds = [
          ...new Set(taskDocs.map((t) => t.assigneeId).filter(Boolean)),
        ];

        const projectsRes = await databases.listDocuments(
          DATABASE_ID,
          PROJECTS_ID,
          projectIds.length > 0 ? [Query.equal("$id", projectIds)] : []
        );
        const projects = projectsRes.documents;

        const membersRes = await databases.listDocuments(
          DATABASE_ID,
          MEMBERS_ID,
          assigneeIds.length > 0 ? [Query.equal("$id", assigneeIds)] : []
        );

        const assignees = await Promise.all(
          membersRes.documents.map(async (member) => {
            try {
              const userInfo = await users.get(member.userId);
              return {
                ...member,
                name: userInfo.name,
                email: userInfo.email,
              };
            } catch (err) {
              return {
                ...member,
                name: "Unknown",
                email: "unknown@example.com",
              };
            }
          })
        );

        const populatedTasks = taskDocs.map((task) => {
          const project =
            projects.find((p) => p.$id === task.projectId) || null;
          const assignee =
            assignees.find((a) => a.$id === task.assigneeId) || null;

          return {
            ...task,
            project,
            assignee,
          };
        });

        return c.json({ tasks: populatedTasks });
      } catch (err) {
        console.error("❌ Error in GET /tasks:", {
          message: err.message,
          stack: err.stack,
          cause: err.cause,
        });
        return c.json({ error: "Internal Server Error" }, 500);
      }
    }
  )
  .delete("/:taskId", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");

    const { taskId } = c.req.param();

    const task = await databases.getDocument<Task>(
      DATABASE_ID,
      TASKS_ID,
      taskId
    );

    const member = await getMember({
      databases,
      workspaceId: task.workspaceId,
      userId: user.$id,
    });

    if (!member) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    await databases.deleteDocument(DATABASE_ID, TASKS_ID, taskId);

    return c.json({ data: { $id: task.$id } });
  })
  .get("/:taskId", sessionMiddleware, async (c) => {
    const user = c.get("user");
    const databases = c.get("databases");
    const { taskId } = c.req.param();

    try {
      const task = await databases.getDocument(DATABASE_ID, TASKS_ID, taskId);

      const member = await getMember({
        databases,
        workspaceId: task.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      return c.json({ task });
    } catch (err) {
      console.error("❌ Error fetching task:", err);
      return c.json({ error: "Task not found" }, 404);
    }
  })
  .patch(
    "/:taskId",
    sessionMiddleware,
    zValidator(
      "json",
      z.object({
        name: z.string().min(1),
        status: z.nativeEnum(TaskStatus),
        assigneeId: z.string().optional(),
        dueDate: z.string().optional(),
        description: z.string().optional(),
      })
    ),
    async (c) => {
      const user = c.get("user");
      const databases = c.get("databases");
      const { taskId } = c.req.param();

      const body = c.req.valid("json");

      const existing = await databases.getDocument<Task>(
        DATABASE_ID,
        TASKS_ID,
        taskId
      );

      const member = await getMember({
        databases,
        workspaceId: existing.workspaceId,
        userId: user.$id,
      });

      if (!member) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const updated = await databases.updateDocument(
        DATABASE_ID,
        TASKS_ID,
        taskId,
        {
          name: body.name,
          status: body.status,
          assigneeId: body.assigneeId,
          dueDate: body.dueDate,
          description: body.description,
        }
      );

      return c.json({ task: updated }, 200);
    }
  );

export default app;
