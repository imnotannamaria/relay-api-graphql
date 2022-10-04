## ✨ Technologies
Technologies used in the project:
- Node
- TypeScript
- Firebase(Firestore)
- Graphql
- Relay

## 💻 Project Features and Mutations

### List posts 

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
 ### Create posts 

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

 ### Edit posts 

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

  ### Delete posts 

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
## About the project ##
Project base created with the help of a video lesson from the dogcode channel.


## 🚀 Deploy
- Install dependencies with `yarn` or `npm i`
- Init with `yarn run dev:server` or `npm run dev:server`
