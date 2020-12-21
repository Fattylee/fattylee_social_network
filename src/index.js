import apolloServer from "apollo-server";
import mongoose from "mongoose";

import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/typeDefs.js";
import config from "./config/index.js";
import Post from "./models/post.js";
import User from "./models/user.js";
const { MONGODB, PORT } = config;

const { ApolloServer } = apolloServer;

const app = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res, User, Post }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MONGODB");
    return app.listen({ port: PORT });
  })
  .then((res) => console.log(`Sever is running: ${res.url}`))
  .catch(console.error);
