"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createTaskSchema } from "../schemas";
import { z } from "zod";
import { useCreateTask } from "../api/use-create-task";
import { TaskStatus } from "../types";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  Tag,
  User,
  Flag,
  Clock,
  AlertCircle,
} from "lucide-react";

type FormValues = z.infer<typeof createTaskSchema>;

interface Props {
  onCancel: () => void;
  workspaceId: string;
  projectOptions: { id: string; name: string }[];
  memberOptions: { id: string; name: string }[];
}

export const CreateTaskForm = ({
  onCancel,
  workspaceId,
  projectOptions,
  memberOptions,
}: Props) => {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      description: "",
      projectId: projectOptions[0]?.id || "",
      assigneeId: memberOptions[0]?.id || "",
      status: TaskStatus.BACKLOG,
      dueDate: undefined,
      workspaceId,
    },
  });

  const { mutate: createTask, isPending } = useCreateTask();

  const onSubmit = (values: FormValues) => {
    createTask(values, {
      onSuccess: () => {
        toast.success("🎉 Task created successfully!");
        router.push(`/workspaces/${workspaceId}/projects/${values.projectId}`);
        onCancel();
      },
      onError: () => {
        toast.error("⚠️ Failed to create task. Please try again.");
      },
    });
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* SECTION: Task Summary */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Tag className="h-4 w-4 text-gray-500" />
                  Task Summary
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="What needs to be done?"
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-base h-12"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Be specific and concise (e.g., "Update login page error
                  messages")
                </FormDescription>
                <FormMessage className="text-red-600 text-xs" />
              </FormItem>
            )}
          />

          {/* SECTION: Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <AlertCircle className="h-4 w-4 text-gray-500" />
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Provide details about the task..."
                    className="resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px] text-sm"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-500">
                  Include acceptance criteria, links, or relevant context
                </FormDescription>
                <FormMessage className="text-red-600 text-xs" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SECTION: Project */}
            <FormField
              control={form.control}
              name="projectId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Tag className="h-4 w-4 text-gray-500" />
                    Project
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {projectOptions.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{project.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-600 text-xs" />
                </FormItem>
              )}
            />

            {/* SECTION: Assignee */}
            <FormField
              control={form.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <User className="h-4 w-4 text-gray-500" />
                    Assignee
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10">
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {memberOptions.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">{member.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-600 text-xs" />
                </FormItem>
              )}
            />

            {/* SECTION: Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Flag className="h-4 w-4 text-gray-500" />
                    Status
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-10">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(TaskStatus).map((status) => (
                        <SelectItem key={status} value={status}>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">
                              {status.replace(/_/g, " ")}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-600 text-xs" />
                </FormItem>
              )}
            />

            {/* SECTION: Due Date */}
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Clock className="h-4 w-4 text-gray-500" />
                    Due Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal h-10 border-gray-300",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-red-600 text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 h-10 px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-6 shadow-sm"
            >
              {isPending ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
