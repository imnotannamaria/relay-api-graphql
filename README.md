## ✨ Tecnologias
Tecnologias utilizadas no projeto:
- Node
- TypeScript
- Firebase(Firestore)
- Graphql
- Relay

## 💻 Funcionalidades do projeto e Mutations

### Listar posts 

    fragment Postlist_framgment on Query {
      posts {
        edges {
          node {
            id
            title,
            body
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }

    query {
      ...Postlist_framgment
    }
 ### Criar posts 

    mutation {
      CreatePost (
        input: {
          title: "Post para editar 1",
          body: "Body para editar 1"
        }
      ) {
        postEdge {
          node {
            id
            title
            body
          }
        }
      }
    }

 ### Editar posts 

    mutation {
      EditPost (
        input: {
          id: "8175f9e4-61bf-4951-a4be-2e4134076f5d",
          title: "Post editado 02",
          body: "Body editado 02"
        }
      ) {
        postEdge {
          node {
            id
            title
            body
          }
        }
      }
    }

  ### Deletar posts 

    mutation {
      DeletePost (
        input: {
          id: "59d9142f-1130-46d4-bd03-564032d0ddc3"
        }
      ) {
        postEdge {
          node {
            id
          }
        }
      }
    }
## Sobre o projeto ##
Base do projeto criada com a ajuda de uma video aula do canal dogcode. 


## 🚀 Deploy
- Instalar dependências com `yarn` ou `npm i`
- Iniciar `yarn run dev:server` ou `npm run dev:server`