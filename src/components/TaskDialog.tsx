import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Type, Tag, BarChart3 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TaskDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSave?: (data: TaskFormValues) => void;
  task?: TaskFormValues;
  mode?: "add" | "edit";
}

interface TaskFormValues {
  id?: string;
  title: string;
  category: string;
  priority: string;
  dueDate: Date | null;
}

const TaskDialog = ({
  open = true,
  onOpenChange = () => {},
  onSave = () => {},
  task = {
    title: "",
    category: "",
    priority: "",
    dueDate: null,
  },
  mode = "add",
}: TaskDialogProps) => {
  const form = useForm<TaskFormValues>({
    defaultValues: task,
  });

  const handleSubmit = (data: TaskFormValues) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900/30 rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-indigo-700 dark:text-indigo-300">
            {mode === "add" ? "Nova Tarefa" : "Editar Tarefa"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <Type className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    Título da Tarefa
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o título da tarefa"
                      {...field}
                      className="border-indigo-100 dark:border-indigo-900/30 focus-visible:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <Tag className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    Categoria
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-indigo-100 dark:border-indigo-900/30 focus-visible:ring-indigo-500">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="work">Trabalho</SelectItem>
                      <SelectItem value="personal">Pessoal</SelectItem>
                      <SelectItem value="shopping">Compras</SelectItem>
                      <SelectItem value="health">Saúde</SelectItem>
                      <SelectItem value="education">Educação</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <BarChart3 className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    Prioridade
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-indigo-100 dark:border-indigo-900/30 focus-visible:ring-indigo-500">
                        <SelectValue placeholder="Selecione o nível de prioridade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Baixa</SelectItem>
                      <SelectItem value="medium">Média</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                    <CalendarIcon className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    Data de Vencimento
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal border-indigo-100 dark:border-indigo-900/30 focus-visible:ring-indigo-500",
                            !field.value &&
                              "text-slate-500 dark:text-slate-400",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        initialFocus
                        locale={ptBR}
                        className="border-indigo-100 dark:border-indigo-900/30"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300"
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {mode === "add" ? "Adicionar Tarefa" : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
