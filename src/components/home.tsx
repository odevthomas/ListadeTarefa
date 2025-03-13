import React, { useState, useEffect } from "react";
import TaskHeader from "./TaskHeader";
import TaskFilters from "./TaskFilters";
import TaskList from "./TaskList";
import TaskDialog from "./TaskDialog";
import EmptyState from "./EmptyState";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  category: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  completed: boolean;
}

interface FilterState {
  category: string;
  priority: string;
  date: string;
  status: string;
}

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priority: "all",
    date: "all",
    status: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Sample tasks for demonstration
      const sampleTasks: Task[] = [
        {
          id: uuidv4(),
          title: "Complete project documentation",
          category: "work",
          priority: "high",
          dueDate: new Date().toISOString().split("T")[0],
          completed: false,
        },
        {
          id: uuidv4(),
          title: "Buy groceries",
          category: "personal",
          priority: "medium",
          dueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
          completed: false,
        },
        {
          id: uuidv4(),
          title: "Schedule dentist appointment",
          category: "health",
          priority: "low",
          dueDate: new Date(Date.now() + 172800000).toISOString().split("T")[0],
          completed: true,
        },
      ];
      setTasks(sampleTasks);
      localStorage.setItem("tasks", JSON.stringify(sampleTasks));
    }

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  // Apply filters and search whenever tasks, filters or searchTerm change
  useEffect(() => {
    let result = [...tasks];

    // Apply category filter
    if (filters.category !== "all") {
      result = result.filter((task) => task.category === filters.category);
    }

    // Apply priority filter
    if (filters.priority !== "all") {
      result = result.filter((task) => task.priority === filters.priority);
    }

    // Apply date filter
    if (filters.date !== "all") {
      const today = new Date().toISOString().split("T")[0];
      const weekLater = new Date(Date.now() + 7 * 86400000)
        .toISOString()
        .split("T")[0];
      const monthLater = new Date(Date.now() + 30 * 86400000)
        .toISOString()
        .split("T")[0];

      if (filters.date === "today") {
        result = result.filter((task) => task.dueDate === today);
      } else if (filters.date === "week") {
        result = result.filter(
          (task) => task.dueDate >= today && task.dueDate <= weekLater,
        );
      } else if (filters.date === "month") {
        result = result.filter(
          (task) => task.dueDate >= today && task.dueDate <= monthLater,
        );
      }
    }

    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter((task) => {
        if (filters.status === "completed") return task.completed;
        if (filters.status === "pending") return !task.completed;
        return true;
      });
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(term) ||
          task.category.toLowerCase().includes(term),
      );
    }

    setFilteredTasks(result);
  }, [tasks, filters, searchTerm]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Handle theme toggle
  const handleThemeToggle = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Handle adding a new task
  const handleAddTask = () => {
    setDialogMode("add");
    setCurrentTask(null);
    setTaskDialogOpen(true);
  };

  // Handle editing a task
  const handleEditTask = (id: string) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setCurrentTask(taskToEdit);
      setDialogMode("edit");
      setTaskDialogOpen(true);
    }
  };

  // Handle saving a task (add or edit)
  const handleSaveTask = (data: any) => {
    if (dialogMode === "add") {
      const newTask: Task = {
        id: uuidv4(),
        title: data.title,
        category: data.category,
        priority: data.priority as "low" | "medium" | "high",
        dueDate: data.dueDate
          ? new Date(data.dueDate).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        completed: false,
      };
      setTasks([...tasks, newTask]);
    } else {
      // Edit existing task
      if (currentTask) {
        const updatedTasks = tasks.map((task) => {
          if (task.id === currentTask.id) {
            return {
              ...task,
              title: data.title,
              category: data.category,
              priority: data.priority as "low" | "medium" | "high",
              dueDate: data.dueDate
                ? new Date(data.dueDate).toISOString().split("T")[0]
                : task.dueDate,
            };
          }
          return task;
        });
        setTasks(updatedTasks);
      }
    }
    setTaskDialogOpen(false);
  };

  // Handle marking a task as complete/incomplete
  const handleCompleteTask = (id: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Handle deleting a task
  const handleDeleteTask = (id: string) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    if (taskToDelete) {
      setCurrentTask(taskToDelete);
      setDeleteDialogOpen(true);
    }
  };

  // Confirm task deletion
  const confirmDeleteTask = () => {
    if (currentTask) {
      const updatedTasks = tasks.filter((task) => task.id !== currentTask.id);
      setTasks(updatedTasks);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TaskHeader
        onAddTask={handleAddTask}
        onThemeToggle={handleThemeToggle}
        currentTheme={theme}
      />

      <TaskFilters
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      <main className="flex-1 container mx-auto p-4 md:p-6">
        {tasks.length === 0 && !isLoading ? (
          <EmptyState
            title="No tasks yet"
            description="Start by adding your first task"
            onAction={handleAddTask}
          />
        ) : (
          <TaskList
            tasks={filteredTasks}
            onComplete={handleCompleteTask}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            isLoading={isLoading}
          />
        )}
      </main>

      {/* Add/Edit Task Dialog */}
      <TaskDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        onSave={handleSaveTask}
        task={
          currentTask
            ? {
                title: currentTask.title,
                category: currentTask.category,
                priority: currentTask.priority,
                dueDate: currentTask.dueDate
                  ? new Date(currentTask.dueDate)
                  : null,
              }
            : undefined
        }
        mode={dialogMode}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDeleteTask}
        taskTitle={currentTask?.title}
      />
    </div>
  );
};

export default Home;
