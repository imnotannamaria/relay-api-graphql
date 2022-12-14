import { GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';

// Basicamente um Model
const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post Type',
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: post => post.id,
    },
    title: {
      type: GraphQLString,
      resolve: post => post.title,
    },
    body: {
      type: GraphQLString,
      resolve: post => post.body,
    }
  })
})

const { connectionType: PostConnection, edgeType: PostEdge } = connectionDefinitions({
  nodeType: PostType
})

export {
  PostConnection,
  PostEdge,
}

export default PostType;