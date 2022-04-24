import { GraphQLObjectType, GraphQLFieldConfig, GraphQLString } from "graphql";

const foo: GraphQLFieldConfig<any, any, any> = {
  resolve: (_root, _args, _context) => 'bar',
  type: GraphQLString
}

export const query  = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    foo
  })
})