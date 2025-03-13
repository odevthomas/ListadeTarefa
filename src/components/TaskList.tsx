import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Task {
  id: string;
  title: string;
  category: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  completed: boolean;
}

interface TaskListProps {
  tasks?: Task[];
  onComplete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isLoading?: boolean;
  error?: string;
}

// EmptyState component defined inline since there was an import error
const EmptyState = ({
  message = "No data found",
  description = "There are no items to display at the moment.",
}: {
  message?: string;
  description?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white">
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 14h6" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{message}</h3>
      <p className="text-sm text-gray-500 max-w-md">{description}</p>
    </div>
  );
};

const TaskList: React.FC<TaskListProps> = ({
  tasks = [
    {
      id: "task-1",
      title: "Complete project documentation",
      category: "Work",
      priority: "high",
      dueDate: "2023-12-31",
      completed: false,
    },
    {
      id: "task-2",
      title: "Buy groceries",
      category: "Personal",
      priority: "medium",
      dueDate: "2023-12-25",
      completed: false,
    },
    {
      id: "task-3",
      title: "Schedule dentist appointment",
      category: "Health",
      priority: "low",
      dueDate: "2024-01-15",
      completed: true,
    },
    {
      id: "task-4",
      title: "Prepare presentation slides",
      category: "Work",
      priority: "high",
      dueDate: "2023-12-28",
      completed: false,
    },
    {
      id: "task-5",
      title: "Call mom",
      category: "Personal",
      priority: "medium",
      dueDate: "2023-12-24",
      completed: true,
    },
  ],
  onComplete = () => {},
  onEdit = () => {},
  onDelete = () => {},
  isLoading = false,
  error = "",
}) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return !task.completed;
    if (activeTab === "completed") return task.completed;
    return true;
  });

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm h-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 border-4 border-t-primary rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm h-full flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-100 text-red-600 p-3 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="text-red-600 font-medium mb-2">Error loading tasks</p>
          <p className="text-gray-500 text-sm">{error}</p>
          <Button variant="outline" className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (totalTasks === 0) {
    return (
      <EmptyState
        message="No tasks found"
        description="Add your first task to get started"
      />
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm h-full flex flex-col border border-indigo-50 dark:border-indigo-900/20">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="text-sm font-medium px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">
            <span className="text-slate-500 dark:text-slate-400">Total: </span>
            <span className="text-indigo-700 dark:text-indigo-300 font-semibold">
              {totalTasks}
            </span>
          </div>
          <div className="text-sm font-medium px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <span className="text-slate-500 dark:text-slate-400">
              Pendentes:{" "}
            </span>
            <span className="text-blue-600 dark:text-blue-300 font-semibold">
              {pendingTasks}
            </span>
          </div>
          <div className="text-sm font-medium px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-full">
            <span className="text-slate-500 dark:text-slate-400">
              Concluídas:{" "}
            </span>
            <span className="text-emerald-600 dark:text-emerald-300 font-semibold">
              {completedTasks}
            </span>
          </div>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        className="flex-1 flex flex-col"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-3 mb-4 bg-indigo-50/50 dark:bg-indigo-950/20">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-900/30 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300"
          >
            Todas Tarefas
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-900/30 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300"
          >
            Pendentes
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-indigo-900/30 data-[state=active]:text-indigo-700 dark:data-[state=active]:text-indigo-300"
          >
            Concluídas
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="all"
          className="flex-1 data-[state=active]:flex flex-col"
        >
          {filteredTasks.length > 0 ? (
            <ScrollArea className="flex-1">
              <div className="space-y-2 pr-4">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    category={task.category}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    completed={task.completed}
                    onComplete={onComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <EmptyState
              message="No tasks found"
              description="Try adjusting your filters"
            />
          )}
        </TabsContent>

        <TabsContent
          value="pending"
          className="flex-1 data-[state=active]:flex flex-col"
        >
          {filteredTasks.length > 0 ? (
            <ScrollArea className="flex-1">
              <div className="space-y-2 pr-4">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    category={task.category}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    completed={task.completed}
                    onComplete={onComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <EmptyState
              message="No pending tasks"
              description="All tasks are completed!"
            />
          )}
        </TabsContent>

        <TabsContent
          value="completed"
          className="flex-1 data-[state=active]:flex flex-col"
        >
          {filteredTasks.length > 0 ? (
            <ScrollArea className="flex-1">
              <div className="space-y-2 pr-4">
                {filteredTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    category={task.category}
                    priority={task.priority}
                    dueDate={task.dueDate}
                    completed={task.completed}
                    onComplete={onComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <EmptyState
              message="No completed tasks"
              description="Complete some tasks to see them here"
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskList;
