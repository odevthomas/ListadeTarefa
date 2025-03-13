import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface DeleteConfirmDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onConfirm?: () => void;
  title?: string;
  description?: string;
  taskTitle?: string;
}

const DeleteConfirmDialog = ({
  open = false,
  onOpenChange = () => {},
  onConfirm = () => {},
  title = "Confirmar Exclusão",
  description = "Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.",
  taskTitle = "Tarefa",
}: DeleteConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/30 rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-rose-500 dark:text-rose-400" />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600 dark:text-slate-400">
            Tem certeza que deseja excluir a tarefa{" "}
            <span className="font-medium text-indigo-600 dark:text-indigo-400">
              "{taskTitle}"
            </span>
            ?
            <br />
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-rose-500 hover:bg-rose-600 text-white dark:bg-rose-600 dark:hover:bg-rose-700"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmDialog;
