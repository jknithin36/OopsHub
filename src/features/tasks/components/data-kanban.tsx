"use client";

import { useCallback, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Task, TaskStatus } from "../types";
import { KanbanCard } from "./kanban-card";
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
  onChange: (
    tasks: { $id: string; status: TaskStatus; position: number }[]
  ) => void;
}

export const DataKanban = ({ data, onChange }: DataKanbanProps) => {
  const [tasks, setTasks] = useState<TasksState>(() => {
    const grouped: TasksState = {
      [TaskStatus.BACKLOG]: [],
      [TaskStatus.TODO]: [],
      [TaskStatus.IN_PROGRESS]: [],
      [TaskStatus.IN_REVIEW]: [],
      [TaskStatus.DONE]: [],
    };

    data.forEach((task) => {
      grouped[task.status].push(task);
    });

    Object.values(grouped).forEach((list) =>
      list.sort((a, b) => a.position - b.position)
    );

    return grouped;
  });

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result;
      if (!destination) return;

      const sourceStatus = source.droppableId as TaskStatus;
      const destStatus = destination.droppableId as TaskStatus;

      setTasks((prev) => {
        const updated = { ...prev };
        const sourceList = [...updated[sourceStatus]];
        const [movedTask] = sourceList.splice(source.index, 1);
        if (!movedTask) return prev;

        const updatedMovedTask =
          sourceStatus !== destStatus
            ? { ...movedTask, status: destStatus }
            : movedTask;

        const destList =
          sourceStatus === destStatus ? sourceList : [...updated[destStatus]];

        destList.splice(destination.index, 0, updatedMovedTask);

        updated[sourceStatus] =
          sourceStatus === destStatus ? destList : sourceList;
        updated[destStatus] = destList;

        const payload: {
          $id: string;
          status: TaskStatus;
          position: number;
        }[] = [];

        destList.forEach((task, idx) => {
          const newPos = (idx + 1) * 1000;
          if (task.position !== newPos || task.status !== destStatus) {
            payload.push({
              $id: task.$id,
              status: destStatus,
              position: newPos,
            });
            task.position = newPos;
            task.status = destStatus;
          }
        });

        if (sourceStatus !== destStatus) {
          sourceList.forEach((task, idx) => {
            const newPos = (idx + 1) * 1000;
            if (task.position !== newPos) {
              payload.push({
                $id: task.$id,
                status: sourceStatus,
                position: newPos,
              });
              task.position = newPos;
            }
          });
        }

        if (payload.length > 0) {
          onChange(payload);
        }

        return updated;
      });
    },
    [onChange]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto p-4 h-[calc(100vh-100px)]">
        {boards.map((board) => (
          <div
            key={board}
            className="bg-muted rounded-md w-[300px] flex-shrink-0 shadow-sm"
          >
            <KanbanColumnHeader board={board} taskCount={tasks[board].length} />
            <Droppable droppableId={board}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-2 p-2 min-h-[100px] rounded-md"
                >
                  {tasks[board].map((task, index) => (
                    <Draggable
                      key={task.$id}
                      draggableId={task.$id}
                      index={index}
                    >
                      {(dragProvided) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                        >
                          <KanbanCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};
