import { Badge } from "@/components/ui/badge";
import { TaskStatus } from "../types";

interface StatusBadgeProps {
  status: TaskStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const map: Record<TaskStatus, { label: string; variant: any }> = {
    BACKLOG: { label: "Backlog", variant: "backlog" },
    TODO: { label: "To Do", variant: "todo" },
    IN_PROGRESS: { label: "In Progress", variant: "inprogress" },
    IN_REVIEW: { label: "In Review", variant: "inreview" },
    DONE: { label: "Done", variant: "done" },
  };

  const { label, variant } = map[status];

  return <Badge variant={variant}>{label}</Badge>;
};
