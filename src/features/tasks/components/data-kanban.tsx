"use client";

import { useState } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { Task, TaskStatus } from "../types";
import { KanbanColumnHeader } from "./kanban-coulmn-header";

const boards: TaskStatus[] = [
  TaskStatus.BACKLOG,
  TaskStatus.TODO,
  TaskStatus.IN_PROGRESS,
  TaskStatus.IN_REVIEW,
  TaskStatus.DONE,
];

type TasksState = {
  [key in TaskStatus]: Task[];
};

interface DataKanbanProps {
  data: Task[];
}

export const DataKanban = ({ data }: DataKanbanProps) => {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const initialTasks: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    // Group tasks by status
    data.forEach((task) => {
      initialTasks[task.status].push(task);
    });

    // Sort each group by position
    Object.keys(initialTasks).forEach((status) => {
      initialTasks[status as TaskStatus].sort(
        (a, b) => a.position - b.position
      );
    });

    return initialTasks;
  });

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex gap-4 overflow-x-auto p-4 h-[calc(100vh-100px)]">
        {boards.map((board) => (
          <div
            key={board}
            className="bg-muted rounded-md w-[300px] flex-shrink-0 shadow-sm"
          >
            <KanbanColumnHeader board={board} taskCount={tasks[board].length} />
            {/* You can render tasks here later */}
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};
