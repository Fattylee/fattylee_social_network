import gql from "graphql-tag";

export default gql`
  input registerInput {
    username: String!
    password: String!
    confirm_password: String!
    email: String!
  }
  type Post {
    body: String!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    hello: String!
    getPosts: [Post]
    user(username: String!): User
  }
  type Mutation {
    register(data: registerInput!): User!
    login(username: String!, password: String!): User!
  }
`;
