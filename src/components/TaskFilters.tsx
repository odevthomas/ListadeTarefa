import React, { useState } from "react";
import {
  Search,
  Filter,
  Tag,
  Clock,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface TaskFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
  onSearch?: (searchTerm: string) => void;
}

interface FilterState {
  category: string;
  priority: string;
  date: string;
  status: string;
}

const TaskFilters = ({
  onFilterChange = () => {},
  onSearch = () => {},
}: TaskFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priority: "all",
    date: "all",
    status: "all",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="w-full bg-background/80 backdrop-blur-sm border-b border-border/30 p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
      <div className="flex flex-1 flex-wrap gap-2">
        <Select
          value={filters.category}
          onValueChange={(value) => handleFilterChange("category", value)}
        >
          <SelectTrigger className="w-[140px] rounded-lg border-indigo-100 dark:border-indigo-900/30 bg-white/80 dark:bg-slate-800/80">
            <Tag className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Categorias</SelectItem>
            <SelectItem value="work">Trabalho</SelectItem>
            <SelectItem value="personal">Pessoal</SelectItem>
            <SelectItem value="study">Estudos</SelectItem>
            <SelectItem value="health">Saúde</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.priority}
          onValueChange={(value) => handleFilterChange("priority", value)}
        >
          <SelectTrigger className="w-[140px] rounded-lg border-indigo-100 dark:border-indigo-900/30 bg-white/80 dark:bg-slate-800/80">
            <BarChart3 className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Prioridades</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="low">Baixa</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.date}
          onValueChange={(value) => handleFilterChange("date", value)}
        >
          <SelectTrigger className="w-[140px] rounded-lg border-indigo-100 dark:border-indigo-900/30 bg-white/80 dark:bg-slate-800/80">
            <Clock className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
            <SelectValue placeholder="Data" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Datas</SelectItem>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="week">Esta Semana</SelectItem>
            <SelectItem value="month">Este Mês</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger className="w-[140px] rounded-lg border-indigo-100 dark:border-indigo-900/30 bg-white/80 dark:bg-slate-800/80">
            <CheckCircle2 className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos Status</SelectItem>
            <SelectItem value="pending">Pendentes</SelectItem>
            <SelectItem value="completed">Concluídas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
          <Input
            type="search"
            placeholder="Buscar tarefas..."
            className="pl-9 w-full rounded-lg border-indigo-100 dark:border-indigo-900/30 bg-white/80 dark:bg-slate-800/80 focus-visible:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          size="sm"
          className="rounded-lg bg-indigo-100 hover:bg-indigo-200 text-indigo-700 dark:bg-indigo-900/50 dark:hover:bg-indigo-900 dark:text-indigo-300"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
      </form>
    </div>
  );
};

export default TaskFilters;
