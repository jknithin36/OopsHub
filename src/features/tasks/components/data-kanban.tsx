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

// Add this utility function at the top of your component file
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

const statusConfig = {
  [TaskStatus.BACKLOG]: {
    label: "Backlog",
    bgColor: "bg-gradient-to-b from-purple-50 to-purple-100",
    headerColor: "bg-purple-500",
  },
  [TaskStatus.TODO]: {
    label: "To Do",
    bgColor: "bg-gradient-to-b from-blue-50 to-blue-100",
    headerColor: "bg-blue-500",
  },
  [TaskStatus.IN_PROGRESS]: {
    label: "In Progress",
    bgColor: "bg-gradient-to-b from-amber-50 to-amber-100",
    headerColor: "bg-amber-500",
  },
  [TaskStatus.IN_REVIEW]: {
    label: "In Review",
    bgColor: "bg-gradient-to-b from-pink-50 to-pink-100",
    headerColor: "bg-pink-500",
  },
  [TaskStatus.DONE]: {
    label: "Done",
    bgColor: "bg-gradient-to-b from-green-50 to-green-100",
    headerColor: "bg-green-500",
  },
};

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
      <div className="flex gap-5 overflow-x-auto p-5 h-[calc(100vh-100px)] scrollbar-hide bg-neutral-50">
        {boards.map((board) => (
          <div
            key={board}
            className={`rounded-xl w-[300px] flex-shrink-0 shadow-md ${statusConfig[board].bgColor}`}
          >
            <div
              className={`${statusConfig[board].headerColor} px-4 py-3 rounded-t-xl flex items-center justify-between`}
            >
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-white/90">
                  {statusConfig[board].label}
                </span>
              </h3>
              <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                {tasks[board].length}
              </span>
            </div>

            <Droppable droppableId={board}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-3 min-h-[150px] rounded-b-xl transition-all duration-200 ${
                    snapshot.isDraggingOver ? "bg-white/50" : ""
                  }`}
                >
                  {tasks[board].map((task, index) => (
                    <Draggable
                      key={task.$id}
                      draggableId={task.$id}
                      index={index}
                    >
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className={`mb-3 transition-transform ${
                            dragSnapshot.isDragging
                              ? "scale-105 opacity-90 shadow-xl"
                              : ""
                          }`}
                        >
                          <KanbanCard task={task} status={board} />
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
