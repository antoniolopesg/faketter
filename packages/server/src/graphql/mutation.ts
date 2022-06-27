import { GraphQLObjectType } from 'graphql';
import { userSignupMutation } from '../modules/user/mutations/userSignupMutation';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    signup: userSignupMutation,
  }),
});
