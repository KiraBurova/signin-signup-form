import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { Resolvers } from './__generated__/resolvers-types';
import UserModel from './schemas/user';

const resolvers: Resolvers = {
  Query: {
    users: () => {
      return [{ email: '', username: '' }];
    },
  },
  Mutation: {
    signUpUser: async (_, { user }) => {
      const { email, username, password } = user;
      /*
        check that user with this email and username does not exist
        encrypt password
        save user to the db
      */
      const foundUser = await UserModel.find({ email, username });

      if (foundUser) {
        throw new GraphQLError('User already exists.', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = new UserModel({ username, email, password: hash });

      try {
        await newUser.save();
      } catch (savingError) {
        if (savingError instanceof Error) {
          throw new Error(savingError.message);
        }
      }

      return { email, username };
    },
  },
};

export default resolvers;
