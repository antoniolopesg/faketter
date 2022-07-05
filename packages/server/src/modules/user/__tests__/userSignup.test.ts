import { graphql } from 'graphql';
import { schema } from '../../../graphql/schema';

type UserSignupOutput = {
  me: {
    id: number;
    email: string;
    name: string;
    dateOfBirth;
  };
  token: string;
};

describe('User Signup', () => {
  it('should be able to signup', async () => {
    const mutation = `
      mutation Test($email: String!, $name: String!, $password: String!, $dateOfBirth: String!) {
        signup(
          input: {email: $email, name: $name, password: $password, dateOfBirth: $dateOfBirth}
        ) {
          token
          me {
            id
            email
            name
            dateOfBirth
          }
        }
      }
    `;

    const variableValues = {
      email: 'foo@bar.com',
      name: 'Antonio Lopes',
      password: 'password',
      dateOfBirth: '2022-07-03',
    };

    const result = await graphql({
      schema,
      source: mutation,
      rootValue: {},
      variableValues,
    });

    expect(result.errors).toBeUndefined();

    const {
      me: { id, dateOfBirth, email, name },
      token,
    } = result?.data?.signup as UserSignupOutput;

    expect(id).toBeDefined();
    expect(token).toBeDefined();
    expect(email).toBe(variableValues.email);
    expect(name).toBe(variableValues.name);
    expect(dateOfBirth).toBe(
      new Date(variableValues.dateOfBirth).toISOString()
    );
  });

  it('should not signup when the provided email is already taken', async () => {
    const mutation = `
      mutation Test($email: String!, $name: String!, $password: String!, $dateOfBirth: String!) {
        signup(
          input: {email: $email, name: $name, password: $password, dateOfBirth: $dateOfBirth}
        ) {
          token
          me {
            id
            email
            name
            dateOfBirth
          }
        }
      }
    `;

    const variableValues = {
      email: 'foo@bar.com',
      name: 'Antonio Lopes',
      password: 'password',
      dateOfBirth: '2022-07-03',
    };

    await graphql({
      schema,
      source: mutation,
      rootValue: {},
      variableValues,
    });

    const result = await graphql({
      schema,
      source: mutation,
      rootValue: {},
      variableValues,
    });

    expect(result.errors).toBeDefined();
    expect(result.errors[0].message).toBe('The email has already been used');
  });
});
