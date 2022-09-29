import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { PostEdge } from '../postType';

import admin from 'firebase-admin';
import { PostProps } from '../../../utils/readDatabase';

export default mutationWithClientMutationId({
  name: 'EditPost',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ id, title, body }) => {
    const db = admin.firestore().collection('teste');

    await db
    .where('id', '==', id)
    .get()
    .then(response => {
      response.docs.map(doc => {
        db.doc(doc.id)
        .update({
          title,
          body
        })
      })
    })

    const post : PostProps = {
      id: id,
      title: title,
      body: body,
    }

    return {
      post,
      error: null,
      success: 'Post edited successfully',
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
