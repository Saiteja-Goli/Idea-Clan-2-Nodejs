const express = require('express');
require('dotenv').config();
const { connection } = require("./src/configs/db");

const { ApolloServer } = require('apollo-server-express');
const { userTypeDefs } = require('./src/GraphQL/user.typeDefs');
const { userResolvers } = require('./src/GraphQL/user.resolvers');
const { postTypeDefs } = require('./src/GraphQL/posts.typeDefs');
const { postResolvers } = require('./src/GraphQL/posts.resolvers');


require('dotenv').config();

async function startServer() {
  const app = express();
  const server = new ApolloServer(
    {
      typeDefs: [userTypeDefs, postTypeDefs],
      resolvers: [userResolvers, postResolvers],
      context: ({ req }) => ({ req })
    }
  );
  await server.start();

  server.applyMiddleware({ app });

  app.get('/', (req, res) => {
    res.send('WELCOME TO SERVER...!');
  });

  app.listen(process.env.PORT || 8090, async () => {
    try {
      await connection;
      console.log('Connected to MongoDB');
      console.log(`Listening on port ${process.env.PORT || 8090}`);
    } catch (error) {
      console.error(error);
    }
  });
}

startServer();
