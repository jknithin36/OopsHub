import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskStatus } from "../types";
import {
  CircleDashedIcon,
  ListTodoIcon,
  Loader2Icon,
  HourglassIcon,
  CheckCircle2Icon,
  PlusIcon,
} from "lucide-react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

interface KanbanColumnHeaderProps {
  board: TaskStatus;
  taskCount: number;
}

// Utility: Format enum-like string into readable Title Case
const formatStatus = (status: string) =>
  status
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

export const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: <CircleDashedIcon className="size-4 text-gray-400" />,
  [TaskStatus.TODO]: <ListTodoIcon className="size-4 text-blue-500" />,
  [TaskStatus.IN_PROGRESS]: (
    <Loader2Icon className="size-4 text-yellow-500 animate-spin" />
  ),
  [TaskStatus.IN_REVIEW]: <HourglassIcon className="size-4 text-purple-500" />,
  [TaskStatus.DONE]: <CheckCircle2Icon className="size-4 text-green-500" />,
};

export const KanbanColumnHeader = ({
  board,
  taskCount,
}: KanbanColumnHeaderProps) => {
  const { open } = useCreateTaskModal();
  const icon = statusIconMap[board];

  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2 bg-muted border-b border-border rounded-t-md">
      {/* Left: Icon + Title */}
      <div className="flex items-center gap-2 truncate">
        {icon}
        <h2 className="text-sm font-medium text-muted-foreground truncate">
          {formatStatus(board)}
        </h2>
        <Badge
          variant="outline"
          className="text-[11px] px-1.5 py-0.5 font-normal"
        >
          {taskCount}
        </Badge>
      </div>

      {/* Right: Add Button */}
      <Button
        onClick={open}
        variant="ghost"
        size="icon"
        className="w-6 h-6 hover:bg-accent"
      >
        <PlusIcon className="w-4 h-4 text-muted-foreground" />
      </Button>
    </div>
  );
};
