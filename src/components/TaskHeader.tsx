import React, { useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun, Plus, CheckSquare, LayoutGrid } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface TaskHeaderProps {
  onAddTask?: () => void;
  onThemeToggle?: (theme: "light" | "dark") => void;
  currentTheme?: "light" | "dark";
}

const TaskHeader = ({
  onAddTask = () => {},
  onThemeToggle = () => {},
  currentTheme = "light",
}: TaskHeaderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">(currentTheme);

  const handleThemeToggle = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    onThemeToggle(newTheme);
  };

  return (
    <header className="w-full h-20 bg-background border-b border-border/30 flex items-center justify-between px-6 sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
      <div className="flex items-center gap-2">
        <CheckSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 text-transparent bg-clip-text">
          Gerenciador de Tarefas
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              {theme === "light" ? (
                <Sun className="h-5 w-5 text-amber-500" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-400" />
              )}
              <span className="sr-only">Alternar tema</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleThemeToggle("light")}>
              <Sun className="mr-2 h-4 w-4 text-amber-500" />
              <span>Claro</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeToggle("dark")}>
              <Moon className="mr-2 h-4 w-4 text-indigo-400" />
              <span>Escuro</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={onAddTask}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4"
        >
          <Plus className="mr-2 h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>
    </header>
  );
};

export default TaskHeader;
