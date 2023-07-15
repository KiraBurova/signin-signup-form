import { ApolloServer, BaseContext } from '@apollo/server';
import * as mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import typeDefs from './schema';
import resolvers from './resolvers';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';

const express = require('express'),
  app = express(),
  session = require('express-session');

require('dotenv').config();

async function main() {
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();


  app.use(
    bodyParser.json(),
    cors<cors.CorsRequest>(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        return { req, res };
      },
    })
  );

  try {
    await mongoose.connect(process.env.MONGO_DB_URI || '');
    console.log(`Mongoose connected on port`);
  } catch (error) {
    console.log(error);
  }

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

main();
