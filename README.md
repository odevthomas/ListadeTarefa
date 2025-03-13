# Gerenciador de Tarefas

![Projetos](https://github.com/user-attachments/assets/82fa2aad-6882-4d2a-98b4-009a942a2c14)

## Sobre o Projeto

Um aplicativo moderno de gerenciamento de tarefas desenvolvido com React, TypeScript e Tailwind CSS. Esta aplicação permite aos usuários organizar suas atividades diárias de forma eficiente, com uma interface intuitiva e responsiva.


## Funcionalidades

- **Interface Moderna**: Design limpo e minimalista com suporte a temas claro e escuro
- **Gerenciamento Completo**: Adicione, edite, exclua e marque tarefas como concluídas
- **Organização Eficiente**: Categorize tarefas, defina prioridades e datas de vencimento
- **Filtragem Avançada**: Filtre por categoria, prioridade, data e status
- **Persistência de Dados**: Armazenamento local para manter suas tarefas entre sessões
- **Design Responsivo**: Funciona perfeitamente em dispositivos desktop e móveis

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **ShadcnUI**: Componentes de UI reutilizáveis
- **React Hook Form**: Gerenciamento de formulários
- **date-fns**: Manipulação de datas
- **UUID**: Geração de IDs únicos
- **Lucide React**: Ícones modernos e consistentes

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

## Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/gerenciador-de-tarefas.git

# Entre no diretório do projeto
cd gerenciador-de-tarefas

# Instale as dependências
npm install
# ou
yarn install

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

O aplicativo estará disponível em `http://localhost:5173`

## Estrutura do Projeto

```
src/
├── components/       # Componentes da aplicação
│   ├── ui/           # Componentes de UI reutilizáveis (shadcn)
│   ├── TaskDialog.tsx
│   ├── TaskFilters.tsx
│   ├── TaskHeader.tsx
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│   ├── DeleteConfirmDialog.tsx
│   ├── EmptyState.tsx
│   ├── NotFound.tsx
│   └── home.tsx
├── lib/             # Utilitários e funções auxiliares
├── index.css        # Estilos globais
└── App.tsx          # Componente principal e rotas
```

## Uso

### Adicionar uma Nova Tarefa

1. Clique no botão "Nova Tarefa" no cabeçalho
2. Preencha o título, categoria, prioridade e data de vencimento
3. Clique em "Adicionar Tarefa"

### Editar uma Tarefa

1. Clique no ícone de edição (lápis) na tarefa desejada
2. Modifique os campos necessários
3. Clique em "Salvar Alterações"

### Marcar como Concluída

- Clique no checkbox ao lado da tarefa ou no ícone de verificação

### Excluir uma Tarefa

1. Clique no menu de opções (três pontos) da tarefa
2. Selecione "Excluir"
3. Confirme a exclusão

### Filtrar Tarefas

- Use os filtros na barra superior para filtrar por categoria, prioridade, data ou status
- Use a barra de pesquisa para encontrar tarefas específicas

### Alternar Tema

- Clique no ícone de sol/lua no cabeçalho para alternar entre os temas claro e escuro

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Seu Nome - [seu-email@exemplo.com](mailto:seu-email@exemplo.com)

Link do Projeto: [https://github.com/seu-usuario/gerenciador-de-tarefas](https://github.com/seu-usuario/gerenciador-de-tarefas)

---

Desenvolvido com ❤️ por Seu Nome
