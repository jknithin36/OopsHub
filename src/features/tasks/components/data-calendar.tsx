import React, { useState } from "react";
import { Task } from "../types";

import {
  addMonths,
  format,
  getDay,
  parse,
  startOfWeek,
  subMonths,
} from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface DataCalendarProps {
  data: Task[];
}

const DataCalendar: React.FC<DataCalendarProps> = ({ data }) => {
  const [value, setValue] = useState<Date>(
    data.length > 0 ? new Date(data[0].dueDate) : new Date()
  );

  const events = data.map((task) => ({
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    title: task.name,
    resource: {
      project: task.project,
      assignee: task.assignee,
      status: task.status,
      id: task.$id,
    },
  }));

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue(subMonths(value, 1));
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1));
    } else if (action === "TODAY") {
      setValue(new Date());
    }
  };

  const eventStyleGetter = (event: any) => {
    const colorMap: Record<string, string> = {
      BACKLOG: "#facc15", // yellow
      TODO: "#3b82f6", // blue
      IN_PROGRESS: "#06b6d4", // cyan
      IN_REVIEW: "#8b5cf6", // purple
      DONE: "#22c55e", // green
    };

    return {
      style: {
        backgroundColor: colorMap[event.resource.status] || "#9ca3af",
        color: "white",
        borderRadius: "6px",
        padding: "4px",
        fontSize: "0.75rem",
        border: "none",
      },
    };
  };

  // ✅ Custom event UI
  const EventCard = ({ event }: { event: any }) => {
    return (
      <div className="rounded p-1">
        <p className="font-medium">{event.title}</p>
        <p className="text-[10px]">
          {event.resource?.assignee?.label ?? "Unassigned"} —{" "}
          {event.resource?.status}
        </p>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-md h-[600px]">
      <Calendar
        localizer={localizer}
        date={value}
        onNavigate={(date) => setValue(date)}
        events={events}
        views={["month"]}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        components={{
          event: EventCard,
        }}
        className="h-full text-sm"
        toolbar
        formats={{
          weekdayFormat: (date, culture, localizer) =>
            localizer?.format(date, "EEE", culture) ?? "",
        }}
      />
    </div>
  );
};

export default DataCalendar;
