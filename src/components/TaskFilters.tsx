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
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priority: "all",
    date: "all",
    status: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters.category === "all" && filters.priority === "all" && filters.date === "all" && filters.status === "all" ? "" : filters);
  };

  return (
    <div className="w-full bg-background/80 backdrop-blur-sm border-b border-border/30 p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
      <div className="flex flex-1 flex-wrap gap-2">
        {["category", "priority", "date", "status"].map((filterKey) => (
          <Select
            key={filterKey}
            value={filters[filterKey as keyof FilterState]}
            onValueChange={(value) =>
              handleFilterChange(filterKey as keyof FilterState, value)
            }
          >
            <SelectTrigger className="w-[140px] rounded-lg border-indigo-100 dark:border-indigo-900/30 bg-white/80 dark:bg-slate-800/80">
              {{
                category: <Tag className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />,
                priority: <BarChart3 className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />,
                date: <Clock className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />,
                status: <CheckCircle2 className="h-4 w-4 mr-2 text-indigo-500 dark:text-indigo-400" />
              }[filterKey]}
            <SelectValue placeholder={filterKey.charAt(0).toUpperCase() + filterKey.slice(1)} />
          </SelectTrigger>
          <SelectContent>
            {filterKey === "category" && (
              <>
                <SelectItem value="all">Todas Categorias</SelectItem>
                <SelectItem value="work">Trabalho</SelectItem>
                <SelectItem value="personal">Pessoal</SelectItem>
                <SelectItem value="study">Estudos</SelectItem>
                <SelectItem value="health">Saúde</SelectItem>
              </>
            )}
            {filterKey === "priority" && (
              <>
                <SelectItem value="all">Todas Prioridades</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
              </>
            )}
            {filterKey === "date" && (
              <>
                <SelectItem value="all">Todas Datas</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
              </>
            )}
            {filterKey === "status" && (
              <>
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="completed">Concluídas</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
        ))}
      </div>

      <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-indigo-500 dark:text-indigo-400" />
          <Input
            type="search"
            placeholder="Buscar tarefas..."
            className="pl-9 w-full rounded-lg border-indigo-100 dark:border-indigo-900/30 focus-visible:ring-indigo-500"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
      </form>
    </div>
  );
};

export default TaskFilters;
