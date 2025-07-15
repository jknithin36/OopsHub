import React, { useState } from "react";
import { Task } from "../types";
import {
  addMonths,
  format,
  getDay,
  parse,
  startOfWeek,
  subMonths,
  isToday,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = { "en-US": enUS };

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
  const [currentDate, setCurrentDate] = useState<Date>(
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
      priority: task.priority || "medium",
      type: task.type || "task",
    },
  }));

  const handleNavigate = (newDate: Date, view?: string, action?: string) => {
    if (action === "PREV") {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (action === "NEXT") {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (action === "TODAY") {
      setCurrentDate(new Date());
    } else {
      setCurrentDate(newDate);
    }
  };

  const statusColorMap: Record<string, string> = {
    BACKLOG: "bg-gray-300 text-gray-800",
    TODO: "bg-blue-100 text-blue-800",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800",
    IN_REVIEW: "bg-purple-100 text-purple-800",
    DONE: "bg-green-100 text-green-800",
  };

  const priorityColorMap: Record<string, string> = {
    high: "border-red-500 before:bg-red-500",
    medium: "border-orange-500 before:bg-orange-500",
    low: "border-blue-500 before:bg-blue-500",
  };

  const typeIconMap: Record<string, string> = {
    task: "",
    bug: "🐞",
    feature: "✨",
    story: "📖",
  };

  const CustomToolbar = ({ label, onNavigate }: any) => {
    return (
      <div className="flex flex-col space-y-4 mb-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigate("PREV")}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <svg
                className="w-5 h-5 text-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={() => onNavigate("TODAY")}
              className="px-4 py-2 text-sm rounded-md bg-muted hover:bg-muted/80 transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => onNavigate("NEXT")}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <svg
                className="w-5 h-5 text-foreground"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <div className="w-20" />
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(statusColorMap).map(([status, colorClass]) => (
            <div
              key={status}
              className={`flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize whitespace-nowrap ${colorClass} shadow-sm`}
            >
              {status.replace("_", " ")}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CustomDayCell = ({ date }: { date: Date }) => {
    const isCurrentDay = isToday(date);
    const isCurrentMonth = isSameMonth(date, currentDate);
    const hasEvents = events.some((e) => isSameDay(e.start, date));

    return (
      <div
        className={`h-full w-full p-1 ${
          isCurrentMonth ? "" : "text-muted-foreground/50"
        }`}
      >
        <div className="flex flex-col h-full">
          <div
            className={`flex items-center justify-center h-8 w-8 rounded-full mx-auto text-sm font-medium ${
              isCurrentDay
                ? "bg-primary text-white"
                : hasEvents
                ? "bg-muted"
                : ""
            }`}
          >
            {format(date, "d")}
          </div>
          {hasEvents && (
            <div className="flex justify-center mt-1">
              <div className="h-1 w-1 rounded-full bg-blue-500"></div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const EventCard = ({ event }: { event: any }) => {
    return (
      <div
        className={`
          group relative px-3 py-2 rounded-lg mb-1 border-l-[4px] shadow-sm transition-all
          ${priorityColorMap[event.resource.priority] || "border-gray-300"}
          bg-card hover:shadow-md
        `}
      >
        <div className="flex items-start gap-2">
          <div className="text-lg leading-5 mt-0.5">
            {typeIconMap[event.resource.type] || ""}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground truncate">
              {event.title}
            </h3>
            <div className="flex items-center mt-1 space-x-2">
              <span
                className={`px-2 py-0.5 text-[11px] rounded-full capitalize ${
                  statusColorMap[event.resource.status] || "bg-muted"
                }`}
              >
                {event.resource.status.replace("_", " ")}
              </span>
              {event.resource.assignee && (
                <span className="text-[11px] text-muted-foreground truncate">
                  {event.resource.assignee.label}
                </span>
              )}
            </div>
          </div>
          {event.resource.priority === "high" && (
            <span className="text-xs font-medium text-red-500">‼️</span>
          )}
        </div>
      </div>
    );
  };

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "transparent",
        border: "none",
        padding: 0,
        borderRadius: "0.5rem",
        boxShadow: "none",
      },
    };
  };

  return (
    <div className="bg-background p-6 sm:p-8 rounded-2xl shadow-md border border-border h-[800px] max-w-full overflow-hidden">
      <Calendar
        localizer={localizer}
        date={currentDate}
        onNavigate={handleNavigate}
        events={events}
        views={["month"]}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        components={{
          event: EventCard,
          toolbar: CustomToolbar,
          month: {
            dateHeader: ({ date }) => <CustomDayCell date={date} />,
          },
        }}
        className="h-full text-sm"
        formats={{
          weekdayFormat: (date) => format(date, "EEE"),
          dayFormat: (date) => format(date, "d"),
        }}
        dayPropGetter={(date) => ({
          className: `h-24 ${
            isSameMonth(date, currentDate)
              ? "hover:bg-muted"
              : "bg-muted/30 text-muted-foreground hover:bg-muted/40"
          }`,
        })}
      />
    </div>
  );
};

export default DataCalendar;
