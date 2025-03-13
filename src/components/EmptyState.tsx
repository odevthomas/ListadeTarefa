import React from "react";
import { Button } from "./ui/button"; // Verifique se o caminho está correto.
import { PlusCircle, ClipboardList } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  isFiltered?: boolean;
}

const EmptyState = ({
  title = "Nenhuma tarefa encontrada",
  description = "Você ainda não tem nenhuma tarefa. Comece criando uma nova tarefa.",
  actionLabel = "Adicionar Tarefa",
  onAction = () => {},
  icon = (
    <ClipboardList className="h-16 w-16 text-indigo-300 dark:text-indigo-500" />
  ),
  isFiltered = false,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] p-8 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-dashed border-indigo-200 dark:border-indigo-800/30">
      <div className="flex flex-col items-center justify-center space-y-5 text-center">
        <div className="rounded-full bg-indigo-50 dark:bg-indigo-900/30 p-6">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          {title}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md">
          {isFiltered
            ? "Nenhuma tarefa corresponde aos seus filtros atuais. Tente ajustar seus critérios de filtro."
            : description}
        </p>
        {!isFiltered && (
          <Button
            onClick={onAction}
            className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
