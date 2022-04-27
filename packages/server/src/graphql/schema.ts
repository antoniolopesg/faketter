import { GraphQLSchema } from 'graphql';
import { query } from './query';

export const schema = new GraphQLSchema({
  query,
});
