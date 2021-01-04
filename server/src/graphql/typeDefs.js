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
    commentCount: Int!
    likeCount: Int!
    createdAt: String!
    updatedAt: String!
    author: User!
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
    createdAt: String!
    updatedAt: String!
    posts: [Post]!
    postCount: Int!
  }
  type UserPayload {
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    me: User!
    getPosts: [Post]!
    getPost(postId: ID!): Post
  }

  type Mutation {
    register(data: registerInput!): UserPayload!
    login(username: String!, password: String!): UserPayload!
    createPost(body: String!): Post!
    editPost(postId: ID!, body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): String!
    likePost(postId: ID!): Post!
  }
`;
