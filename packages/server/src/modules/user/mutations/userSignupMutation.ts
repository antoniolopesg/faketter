import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { prisma } from '../../../lib/prisma';
import { hashPassword } from '../userPasswordHandlers';
import { UserType } from '../UserType';

export const userSignupMutation = mutationWithClientMutationId({
  name: 'UserSignup',
  inputFields: {
    email: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    dateOfBirth: { type: new GraphQLNonNull(GraphQLString) },
  },
  async mutateAndGetPayload({ email, password, dateOfBirth, ...rest }) {
    const userUsingEmailInput = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userUsingEmailInput) {
      throw new Error('The email has already been used');
    }

    const user = {
      email,
      password: await hashPassword(password),
      dateOfBirth: new Date(dateOfBirth),
      ...rest,
    };

    const storedUser = await prisma.user.create({ data: user });

    return {
      id: storedUser.id,
      token: 'JWT Token',
    };
  },
  outputFields: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: ({ token }) => token,
    },
    me: {
      type: new GraphQLNonNull(UserType),
      resolve: async ({ id }) => prisma.user.findFirst({ where: { id } }),
    },
  },
});
