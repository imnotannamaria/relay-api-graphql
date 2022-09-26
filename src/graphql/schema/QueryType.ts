import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { connectionArgs, connectionFromArray } from 'graphql-relay';

import { PostConnection } from '../post/postType';
import { readDatabase } from '../../utils/readDatabase';

// Concentra todas as query da aplicação (entry point)
const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    posts: {
      type: new GraphQLNonNull(PostConnection),
      args: connectionArgs,
      //first, after, before, last
      resolve: async (_, args) => {
        const data = await readDatabase();
        if(data == null){
          return 'No Posts!'
        }
        else {
          return connectionFromArray(data, args);
        }
      }
    }
  })
});

export default QueryType;