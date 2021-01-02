import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
} from "@apollo/client";
import React from "react";

// const uri="http://localhost:5000";i
const uri = "https://fattylee-social-network.herokuapp.com/";
const httpLink = new HttpLink({ uri });

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
  link: concat(authMiddleware, httpLink),
  // uri: "http://localhost:5000",
  // headers: {
  //   authorization: "bearer " + localStorage.jwtToken || null,
  // },
  cache: new InMemoryCache(),
});
const AppProvider = (props) => {
  return <ApolloProvider client={client} {...props} />;
};

export default AppProvider;
