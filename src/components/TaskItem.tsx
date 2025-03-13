import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  MoreHorizontal,
  Edit,
  Trash,
  CheckCircle,
  Calendar,
  Tag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface TaskItemProps {
  id?: string;
  title?: string;
  category?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  completed?: boolean;
  onComplete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id = "task-1",
  title = "Completar documentação do projeto",
  category = "Trabalho",
  priority = "medium",
  dueDate = "2023-12-31",
  completed = false,
  onComplete = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  // Priority color mapping
  const priorityColors = {
    low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    medium:
      "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    high: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  };

  const priorityLabels = {
    low: "Baixa",
    medium: "Média",
    high: "Alta",
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`flex items-center p-4 border border-indigo-50 dark:border-indigo-900/20 rounded-xl mb-3 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200 ${completed ? "opacity-60" : ""}`}
    >
      <div className="flex items-center space-x-4 flex-1">
        <Checkbox
          checked={completed}
          onCheckedChange={() => onComplete(id)}
          className="h-5 w-5 border-indigo-300 dark:border-indigo-700 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white"
        />

        <div className="flex-1">
          <h3
            className={`text-base font-medium ${completed ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-800 dark:text-slate-200"}`}
          >
            {title}
          </h3>
          <div className="flex flex-wrap items-center mt-1.5 gap-2 text-sm">
            <div className="flex items-center text-slate-500 dark:text-slate-400">
              <Tag className="h-3.5 w-3.5 mr-1 text-indigo-500 dark:text-indigo-400" />
              <span>{category}</span>
            </div>
            <Badge
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityColors[priority]}`}
            >
              {priorityLabels[priority]}
            </Badge>
            <div className="flex items-center text-slate-500 dark:text-slate-400">
              <Calendar className="h-3.5 w-3.5 mr-1 text-indigo-500 dark:text-indigo-400" />
              <span>{formatDate(dueDate)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1">
        {!completed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onComplete(id)}
            title="Marcar como concluída"
            className="rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
          >
            <CheckCircle className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
          </Button>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(id)}
          title="Editar tarefa"
          className="rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
        >
          <Edit className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <MoreHorizontal className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(id)}>
              <Edit className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(id)}
              className="text-rose-600 dark:text-rose-400"
            >
              <Trash className="h-4 w-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TaskItem;
