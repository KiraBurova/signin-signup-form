import { ApolloServer } from '@apollo/server';
import * as mongoose from 'mongoose';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema';
import resolvers from './resolvers';

require('dotenv').config();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  try {
    await mongoose.connect(process.env.MONGO_DB_URI || '');
    console.log(`Mongoose connected on port`);
  } catch (error) {
    console.log(error);
  }

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
