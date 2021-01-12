import apolloServer from "apollo-server-express";
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";

import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/typeDefs.js";
import config from "./config/index.js";
import Post from "./models/post.js";
import User from "./models/user.js";
const { MONGODB, PORT } = config;

const { ApolloServer, PubSub } = apolloServer;

const app = express();
const pubSub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return { req, res, User, Post, pubSub };
  },
  playground: true,
  introspection: true,
});

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(process.env.NODE_ENV, "===env===");
  console.log(req.headers, "==========req.headers===============");
  console.log(req.cookies, "==========req.cookies===============");
  next();
});

server.applyMiddleware({
  app,
  path: "/",
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? /\.netlify\.app$/
        : "http://localhost:3000",
    credentials: true,
  },
});

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to MONGODB");
    app.listen({ port: PORT });
    console.log(
      `Sever is running: ${JSON.stringify(server.graphqlPath, null, 1)}`
    );
  })
  .catch(console.error);
