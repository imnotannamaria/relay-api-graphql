import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId, toGlobalId } from 'graphql-relay';

import { resolve } from 'path';
import { uuid } from 'uuidv4';
import fs from 'fs';

import { PostEdge } from '../postType';

import admin from 'firebase-admin';
import serviceAccount from '../../../utils/ServiceAccontKeys.json'
import { PostProps, readDatabase } from '../../../utils/readDatabase';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export default mutationWithClientMutationId({
  name: 'CreatePost',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ title, body }) => {
    const source = resolve(__dirname, '..', '..', '..', '..');

    const data = await readDatabase();
    
    const post : PostProps = {
      id: uuid(),
      title,
      body
    }

    let posts = [];
    
    if(data) {
      posts = [
        ...data,
        {
          ...post
        }
      ]
    } else {
      posts = [
        {
          ...post
        }
      ]
    }

    admin.firestore()
    .collection('posts')
    .add({
      post
    })
    .then(() => {
      console.log('Produto adicionado com sucesso!');
    })
    .catch((error) => console.log(error));

    return {
      post,
      error: null,
      success: 'Post created successfully',
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
          node: post
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
