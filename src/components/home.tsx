import React, { useState, useEffect } from "react";
import TaskHeader from "./TaskHeader";
import TaskFilters from "./TaskFilters";
import TaskList from "./TaskList";
import TaskDialog from "./TaskDialog";
import EmptyState from "./EmptyState";
import DeleteConfirmDialog from "./DeleteConfirmDialog";
import { v4 as uuidv4 } from "uuid";

interface Tarefa {
  id: string;
  titulo: string;
  categoria: string;
  prioridade: "baixa" | "media" | "alta";
  dataVencimento: string;
  concluida: boolean;
}

interface EstadoFiltro {
  categoria: string;
  prioridade: string;
  data: string;
  status: string;
}

const Home = () => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [tarefasFiltradas, setTarefasFiltradas] = useState<Tarefa[]>([]);
  const [filtros, setFiltros] = useState<EstadoFiltro>({
    categoria: "todas",
    prioridade: "todas",
    data: "todas",
    status: "todas",
  });
  const [termoBusca, setTermoBusca] = useState("");
  const [tema, setTema] = useState<"claro" | "escuro">("claro");
  const [dialogoTarefaAberto, setDialogoTarefaAberto] = useState(false);
  const [dialogoExclusaoAberto, setDialogoExclusaoAberto] = useState(false);
  const [tarefaAtual, setTarefaAtual] = useState<Tarefa | null>(null);
  const [modoDialogo, setModoDialogo] = useState<"adicionar" | "editar">("adicionar");
  const [carregando, setCarregando] = useState(true);

  // Carregar tarefas do localStorage na renderização inicial
  useEffect(() => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    const temaSalvo = localStorage.getItem("tema") as "claro" | "escuro";

    if (tarefasSalvas) {
      try {
        setTarefas(JSON.parse(tarefasSalvas));
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
        setTarefas([]);
      }
    } else {
      // Tarefas de exemplo para demonstração
      const tarefasExemplo: Tarefa[] = [
        {
          id: uuidv4(),
          titulo: "Completar documentação do projeto",
          categoria: "trabalho",
          prioridade: "alta",
          dataVencimento: new Date().toISOString().split("T")[0],
          concluida: false,
        },
        {
          id: uuidv4(),
          titulo: "Comprar mantimentos",
          categoria: "pessoal",
          prioridade: "media",
          dataVencimento: new Date(Date.now() + 86400000).toISOString().split("T")[0],
          concluida: false,
        },
        {
          id: uuidv4(),
          titulo: "Agendar consulta odontológica",
          categoria: "saude",
          prioridade: "baixa",
          dataVencimento: new Date(Date.now() + 172800000).toISOString().split("T")[0],
          concluida: true,
        },
      ];
      setTarefas(tarefasExemplo);
      localStorage.setItem("tarefas", JSON.stringify(tarefasExemplo));
    }

    if (temaSalvo) {
      setTema(temaSalvo);
      document.documentElement.classList.toggle("dark", temaSalvo === "escuro");
    }

    // Simular carregamento
    setTimeout(() => setCarregando(false), 800);
  }, []);

  // Aplicar filtros e busca sempre que tarefas, filtros ou termoBusca mudam
  useEffect(() => {
    let resultado = [...tarefas];

    // Aplicar filtro de categoria
    if (filtros.categoria !== "todas") {
      resultado = resultado.filter((tarefa) => tarefa.categoria === filtros.categoria);
    }

    // Aplicar filtro de prioridade
    if (filtros.prioridade !== "todas") {
      resultado = resultado.filter((tarefa) => tarefa.prioridade === filtros.prioridade);
    }

    // Aplicar filtro de data
    if (filtros.data !== "todas") {
      const hoje = new Date().toISOString().split("T")[0];
      const semanaDepois = new Date(Date.now() + 7 * 86400000)
        .toISOString()
        .split("T")[0];
      const mesDepois = new Date(Date.now() + 30 * 86400000)
        .toISOString()
        .split("T")[0];

      if (filtros.data === "hoje") {
        resultado = resultado.filter((tarefa) => tarefa.dataVencimento === hoje);
      } else if (filtros.data === "semana") {
        resultado = resultado.filter(
          (tarefa) => tarefa.dataVencimento >= hoje && tarefa.dataVencimento <= semanaDepois,
        );
      } else if (filtros.data === "mes") {
        resultado = resultado.filter(
          (tarefa) => tarefa.dataVencimento >= hoje && tarefa.dataVencimento <= mesDepois,
        );
      }
    }

    // Aplicar filtro de status
    if (filtros.status !== "todas") {
      resultado = resultado.filter((tarefa) => {
        if (filtros.status === "concluidas") return tarefa.concluida;
        if (filtros.status === "pendentes") return !tarefa.concluida;
        return true;
      });
    }

    // Aplicar termo de busca
    if (termoBusca) {
      const termo = termoBusca.toLowerCase();
      resultado = resultado.filter(
        (tarefa) =>
          tarefa.titulo.toLowerCase().includes(termo) ||
          tarefa.categoria.toLowerCase().includes(termo),
      );
    }

    setTarefasFiltradas(resultado);
  }, [tarefas, filtros, termoBusca]);

  // Salvar tarefas no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  // Tratar alternância de tema
  const tratarAlternarTema = (novoTema: "claro" | "escuro") => {
    setTema(novoTema);
    document.documentElement.classList.toggle("dark", novoTema === "escuro");
    localStorage.setItem("tema", novoTema);
  };

  // Tratar alterações de filtro
  const tratarMudancaFiltro = (novosFiltros: EstadoFiltro) => {
    setFiltros(novosFiltros);
  };

  // Tratar busca
  const tratarBusca = (termo: string) => {
    setTermoBusca(termo);
  };

  // Tratar adição de nova tarefa
  const tratarAdicionarTarefa = () => {
    setModoDialogo("adicionar");
    setTarefaAtual(null);
    setDialogoTarefaAberto(true);
  };

  // Tratar edição de tarefa
  const tratarEditarTarefa = (id: string) => {
    const tarefaParaEditar = tarefas.find((tarefa) => tarefa.id === id);
    if (tarefaParaEditar) {
      setTarefaAtual(tarefaParaEditar);
      setModoDialogo("editar");
      setDialogoTarefaAberto(true);
    }
  };

  // Tratar salvamento de tarefa (adicionar ou editar)
  const tratarSalvarTarefa = (dados: any) => {
    if (modoDialogo === "adicionar") {
      const novaTarefa: Tarefa = {
        id: uuidv4(),
        titulo: dados.titulo,
        categoria: dados.categoria,
        prioridade: dados.prioridade as "baixa" | "media" | "alta",
        dataVencimento: dados.dataVencimento
          ? new Date(dados.dataVencimento).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        concluida: false,
      };
      setTarefas([...tarefas, novaTarefa]);
    } else {
      // Editar tarefa existente
      if (tarefaAtual) {
        const tarefasAtualizadas = tarefas.map((tarefa) => {
          if (tarefa.id === tarefaAtual.id) {
            return {
              ...tarefa,
              titulo: dados.titulo,
              categoria: dados.categoria,
              prioridade: dados.prioridade as "baixa" | "media" | "alta",
              dataVencimento: dados.dataVencimento
                ? new Date(dados.dataVencimento).toISOString().split("T")[0]
                : tarefa.dataVencimento,
            };
          }
          return tarefa;
        });
        setTarefas(tarefasAtualizadas);
      }
    }
    setDialogoTarefaAberto(false);
  };

  // Tratar marcar tarefa como concluída/pendente
  const tratarConcluirTarefa = (id: string) => {
    const tarefasAtualizadas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });
    setTarefas(tarefasAtualizadas);
  };

  // Tratar exclusão de tarefa
  const tratarExcluirTarefa = (id: string) => {
    const tarefaParaExcluir = tarefas.find((tarefa) => tarefa.id === id);
    if (tarefaParaExcluir) {
      setTarefaAtual(tarefaParaExcluir);
      setDialogoExclusaoAberto(true);
    }
  };

  // Confirmar exclusão de tarefa
  const confirmarExclusaoTarefa = () => {
    if (tarefaAtual) {
      const tarefasAtualizadas = tarefas.filter((tarefa) => tarefa.id !== tarefaAtual.id);
      setTarefas(tarefasAtualizadas);
      setDialogoExclusaoAberto(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TaskHeader
        onAddTask={tratarAdicionarTarefa}
        onThemeToggle={tratarAlternarTema}
        currentTheme={tema}
        labels={{
          addButton: "Nova Tarefa",
          themeToggle: tema === "claro" ? "Modo Escuro" : "Modo Claro",
          appTitle: "Gerenciador de Tarefas"
        }}
      />

      <TaskFilters
        onFilterChange={tratarMudancaFiltro}
        onSearch={tratarBusca}
        labels={{
          searchPlaceholder: "Buscar tarefas...",
          categoryFilter: {
            label: "Categoria",
            options: [
              { value: "todas", label: "Todas" },
              { value: "trabalho", label: "Trabalho" },
              { value: "pessoal", label: "Pessoal" },
              { value: "saude", label: "Saúde" },
              { value: "outros", label: "Outros" }
            ]
          },
          priorityFilter: {
            label: "Prioridade",
            options: [
              { value: "todas", label: "Todas" },
              { value: "baixa", label: "Baixa" },
              { value: "media", label: "Média" },
              { value: "alta", label: "Alta" }
            ]
          },
          dateFilter: {
            label: "Data",
            options: [
              { value: "todas", label: "Todas" },
              { value: "hoje", label: "Hoje" },
              { value: "semana", label: "Esta Semana" },
              { value: "mes", label: "Este Mês" }
            ]
          },
          statusFilter: {
            label: "Status",
            options: [
              { value: "todas", label: "Todas" },
              { value: "pendentes", label: "Pendentes" },
              { value: "concluidas", label: "Concluídas" }
            ]
          }
        }}
      />

      <main className="flex-1 container mx-auto p-4 md:p-6">
        {tarefas.length === 0 && !carregando ? (
          <EmptyState
            title="Nenhuma tarefa ainda"
            description="Comece adicionando sua primeira tarefa"
            actionLabel="Adicionar Tarefa"
            onAction={tratarAdicionarTarefa}
          />
        ) : (
          <TaskList
            tasks={tarefasFiltradas}
            onComplete={tratarConcluirTarefa}
            onEdit={tratarEditarTarefa}
            onDelete={tratarExcluirTarefa}
            isLoading={carregando}
            labels={{
              loading: "Carregando tarefas...",
              noResults: "Nenhuma tarefa encontrada para os filtros aplicados",
              priorityLabels: {
                baixa: "Baixa",
                media: "Média",
                alta: "Alta"
              },
              actions: {
                edit: "Editar",
                delete: "Excluir"
              }
            }}
          />
        )}
      </main>

      {/* Diálogo de Adicionar/Editar Tarefa */}
      <TaskDialog
        open={dialogoTarefaAberto}
        onOpenChange={setDialogoTarefaAberto}
        onSave={tratarSalvarTarefa}
        task={
          tarefaAtual
            ? {
                titulo: tarefaAtual.titulo,
                categoria: tarefaAtual.categoria,
                prioridade: tarefaAtual.prioridade,
                dataVencimento: tarefaAtual.dataVencimento
                  ? new Date(tarefaAtual.dataVencimento)
                  : null,
              }
            : undefined
        }
        mode={modoDialogo}
        labels={{
          title: {
            adicionar: "Adicionar Nova Tarefa",
            editar: "Editar Tarefa"
          },
          form: {
            titleField: {
              label: "Título",
              placeholder: "Digite o título da tarefa"
            },
            categoryField: {
              label: "Categoria",
              placeholder: "Selecione uma categoria",
              options: [
                { value: "trabalho", label: "Trabalho" },
                { value: "pessoal", label: "Pessoal" },
                { value: "saude", label: "Saúde" },
                { value: "outros", label: "Outros" }
              ]
            },
            priorityField: {
              label: "Prioridade",
              placeholder: "Selecione a prioridade",
              options: [
                { value: "baixa", label: "Baixa" },
                { value: "media", label: "Média" },
                { value: "alta", label: "Alta" }
              ]
            },
            dateField: {
              label: "Data de Vencimento",
              placeholder: "Selecione uma data"
            }
          },
          buttons: {
            cancel: "Cancelar",
            save: "Salvar"
          }
        }}
      />

      {/* Diálogo de Confirmação de Exclusão */}
      <DeleteConfirmDialog
        open={dialogoExclusaoAberto}
        onOpenChange={setDialogoExclusaoAberto}
        onConfirm={confirmarExclusaoTarefa}
        taskTitle={tarefaAtual?.titulo}
        labels={{
          title: "Excluir Tarefa",
          description: "Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.",
          cancelButton: "Cancelar",
          confirmButton: "Excluir"
        }}
      />
    </div>
  );
};

export default Home;