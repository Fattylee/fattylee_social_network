import gql from "graphql-tag";

export default gql`
  input registerInput {
    username: String!
    password: String!
    confirm_password: String!
    email: String!
  }
  type Comment {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
  }
  type Post {
    id: ID!
    body: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: ID!
    username: String!
    createdAt: String!
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
    getPosts: [Post]!
    user(username: String!): User
  }
  type Mutation {
    register(data: registerInput!): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: String!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: String!): String!
    likePost(postId: ID!): Post!
  }
`;
