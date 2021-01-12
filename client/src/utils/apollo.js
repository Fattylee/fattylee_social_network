import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import React from "react";

const uri = process.env.REACT_APP_WEB_SERVER_URI;
const link = new HttpLink({
  uri,
  credentials: "include",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.jwtToken
        ? `Bearer ${localStorage.jwtToken}`
        : null,
    },
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, link),
  cache: new InMemoryCache(),
});

const AppProvider = (props) => {
  return <ApolloProvider client={client} {...props} />;
};

export default AppProvider;
