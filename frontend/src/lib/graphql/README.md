# GraphQL Code Generator

Este documento explica como a tipagem forte das consultas e mutações (Queries/Mutations) do GraphQL foi estruturada no projeto React apontando para o seu backend.

## 1. O Que Foi Configurado

A ferramenta principal utilizada foi o **GraphQL Code Generator** (`@graphql-codegen/cli` e `client-preset`). 

### Arquivos Principais que Foram Alterados:
- **`codegen.ts` (na raiz do frontend)**: Lê o Schema diretamente da API backend (configurado para `http://localhost:3000/graphql`), vasculha o seu código por strings do GraphQL e deposita os tipos na pasta `generated/`.
- **`package.json`**: Adicionado o script `"generate": "graphql-codegen"`.
- **Arquivos tsconfig**: Desativada a opção `verbatimModuleSyntax` para resolver os conflitos de importação exclusivos que as funções geradas tinham com essas opções nativas de bundlers novos do Vite.
- **Mutations (Ex: `login.ts` e `register.ts`)**: Trocamos a tag `gql` padrão do pacote `@apollo/client` por utilizar o ajudante `graphql()` tipado proveniente da pasta `/generated/`.

## 2. Como Usar o GraphQL e Apollo no Dia a Dia

Sempre que a equipe do Backend criar uma nova tabela, uma nova Query ou modificar alguma assinatura de Mutation, você **não precisa e não deve** criar interfaces TypeScript manuais no frontend! Deixe o codegen fazer o trabalho:

### Passo a Passo:

**A) Garanta que o Backend esteja Online**
O Codegen vai bater na rota `localhost:3000/graphql` para buscar os tipos, então ele precisa estar ativo.

**B) Crie ou edite sua Query/Mutation**
Sempre utilize a função `graphql` advinda da pasta `generated`:

```typescript
// src/lib/graphql/queries/exemplo.ts
import { graphql } from "../generated"

// Note que estou usando graphql() gerado em vez de gql``
export const GET_USERS = graphql(`
  query GetUsers {
    users {
      data {
        id
        fullName
      }
    }
  }
`)
```

**C) Rode o comando de Geração**
No seu terminal rodando no diretório `frontend/`, execute:
```bash
npm run generate
```
Ele vai ler a query recém-criada, cruzar com o schema local e vai atualizar dinamicamente a pasta `src/lib/graphql/generated/`.

**D) Use o Apollo Componente ou Store Normalmente**
Como a constante exportada (`GET_USERS`) já carrega um mapa mental de objetos, você não precisa fazer tipagem no Apollo, ele deduzirá o payload:

```tsx
import { useQuery } from "@apollo/client"
import { GET_USERS } from "@/lib/graphql/queries/exemplo"

export function MinhaLista() {
  const { data, loading } = useQuery(GET_USERS)
  
  // Ao digitar data., o Visual Studio Code (TS) já vai saber
  // que existe um array "users.data" contendo "id" e "fullName".
}
```

## Benefícios Desta Abordagem
- Tolerância zero a erros de digitação: O Build do frontend agora vai quebrar automaticamente informando caso alguém renomeie algum campo na base de dados no backend, antes mesmo do código ir para a nuvem.
- Extrema facilidade na prototipagem, basta escrever GraphQL que as Interfaces chegam de bandeja prontas.
