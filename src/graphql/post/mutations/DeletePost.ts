import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { PostEdge } from '../postType';

import admin from 'firebase-admin';
import { PostProps } from '../../../utils/readDatabase';

export default mutationWithClientMutationId({
  name: 'DeletePost',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  mutateAndGetPayload: async ({ id }) => {
    const db = admin.firestore().collection('teste');

    await db
    .where('id', '==', id)
    .get()
    .then(response => {
      response.docs.map(doc => {
        db.doc(doc.id)
        .delete()
      })
    })

    const post : any = {
      id: id,
    }

    return {
      post,
      error: null,
      success: 'Post Deleted successfully',
    }
  },
  outputFields: {
    postEdge: {
      type: PostEdge,
      resolve: async ({ post }) => {
        if(!post) {
          return null;
        }

        return {
          cursor: toGlobalId('Post', post.id),
          node: post,
        }
      }
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    },
    success: {
      type: GraphQLString,
      resolve: ({ success }) => success
    },
  }
})
