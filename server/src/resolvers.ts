// Resolvers define how to fetch the types defined in your schema.
import { Resolvers } from './__generated__/resolvers-types';

// This resolver retrieves books from the "books" array above.
const resolvers: Resolvers = {
  Query: {
    users: () => {
      return [{ email: '', username: '' }];
    },
  },
  Mutation: {
    signUpUser: (_, { user }) => {
      const { email, username } = user;
      return { email, username };
    },
  },
};

export default resolvers;
