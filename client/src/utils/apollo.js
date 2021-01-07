import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import React from "react";

const uri = process.env.REACT_APP_WEB_SERVER_URI;
const httpLink = new HttpLink({ uri });
// const wsLink = new WebSocketLink({ uri, options: { reconnect: true } });

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

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === "OperationDefinition" &&
//       definition.operation === "subscription"
//     );
//   },
//   wsLink,
//   httpLink
// );
const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  // uri: "http://localhost:5000",
  // headers: {
  //   authorization: "bearer " + localStorage.jwtToken || null,
  // },
  // link: splitLink,
  cache: new InMemoryCache(),
});
const AppProvider = (props) => {
  return <ApolloProvider client={client} {...props} />;
};

export default AppProvider;
