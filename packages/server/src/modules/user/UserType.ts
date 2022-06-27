import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { connectionDefinitions, globalIdField } from 'graphql-relay';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User Type',
  fields: () => ({
    id: globalIdField('User'),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.name,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.email,
    },
    phone: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.phone,
    },
    dateOfBirth: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (user) => user.dateOfBirth.toISOString(),
    },
  }),
});

const { connectionType: UserConnection, edgeType: UserEdge } =
  connectionDefinitions({
    nodeType: UserType,
  });

export { UserConnection, UserEdge, UserType };
