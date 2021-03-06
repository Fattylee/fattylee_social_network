import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
  concat,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React from "react";

const uri = process.env.REACT_APP_WEB_SERVER_URI;
const link = new HttpLink({
  uri,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.jwtToken
        ? `Bearer ${localStorage.jwtToken}`
        : null,
    },
  };
});

const client = new ApolloClient({
  link: concat(authLink, link),
  cache: new InMemoryCache({
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       getPosts: {
    //         merge: false,
    //       },
    //     },
    //   },
    //   Post: {
    //     fields: {
    //       comments: {
    //         merge: false,
    //         // merge(existing = [], incoming) {
    //         //   console.log(existing, "===existing===");
    //         //   console.log(incoming);
    //         //   return [...existing, ...incoming];
    //         // },
    //       },
    //       username: {
    //         read(uname) {
    //           // console.log(uname, "===from typePolicies===");
    //           return uname.toUpperCase();
    //         },
    //       },
    //     },
    //   },
    // },
  }),
});

const AppProvider = (props) => {
  return <ApolloProvider client={client} {...props} />;
};

export default AppProvider;
