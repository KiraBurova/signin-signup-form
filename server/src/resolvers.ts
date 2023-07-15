import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { Resolvers } from './__generated__/resolvers-types';
import UserModel from './schemas/user';

const resolvers: Resolvers = {
  Mutation: {
    signUpUser: async (_, { user }) => {
      const { email, username, password } = user;

      /*
        check that user with this email and username does not exist
        encrypt password
        save user to the db
      */
      const foundUser = await UserModel.find({ email, username });

      if (foundUser.length > 0) {
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
    signInUser: async (_, { user }) => {
      /**
       * find user by username
       * check that password are matching
       * if yes -> success
       */
      const { username, password } = user;
      const foundUser = await UserModel.findOne({ username });
      if (foundUser) {
        const match = await bcrypt.compare(password, foundUser.password);

        if (match) {
          return { message: 'Signed in successfully!', status: 'success' };
        } 
        else {
          return { message: 'Password does not match.', status: 'error' };
        }
      }
       else {
        return { message: 'No user with this name.', status: 'error' };
      }
    },
  },
};

export default resolvers;
