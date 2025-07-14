import { Badge } from "@/components/ui/badge";
import { TaskStatus } from "../types";
import {
  CircleDashedIcon,
  ListTodoIcon,
  Loader2Icon,
  HourglassIcon,
  CheckCircle2Icon,
  PlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface KanbanColumnHeaderProps {
  board: TaskStatus;
  taskCount: number;
}

// Converts ENUM to readable title case
const formatStatus = (status: string) =>
  status
    .toLowerCase()
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
  [TaskStatus.BACKLOG]: (
    <CircleDashedIcon className="size-[18px] text-gray-400" />
  ),
  [TaskStatus.TODO]: <ListTodoIcon className="size-[18px] text-blue-500" />,
  [TaskStatus.IN_PROGRESS]: (
    <Loader2Icon className="size-[18px] text-yellow-500 animate-spin" />
  ),
  [TaskStatus.IN_REVIEW]: (
    <HourglassIcon className="size-[18px] text-purple-500" />
  ),
  [TaskStatus.DONE]: (
    <CheckCircle2Icon className="size-[18px] text-green-500" />
  ),
};

export const KanbanColumnHeader = ({
  board,
  taskCount,
}: KanbanColumnHeaderProps) => {
  const icon = statusIconMap[board];

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-neutral-800">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-sm font-semibold text-foreground">
          {formatStatus(board)}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          {taskCount}
        </Badge>
        <Button
          onClick={() => {}}
          variant="ghost"
          size="icon"
          className="size-6"
        >
          <PlusIcon className="size-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  );
};
