import gql from "graphql-tag";

export default gql`
  type Post {
    body: String!
  }
  type Query {
    hello: String!
    getPosts: [Post]
  }
`;
