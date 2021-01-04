import { gql } from "@apollo/client";

export const FETCH_POSTS = gql`
  query fetchPosts {
    posts: getPosts {
      id
      body
      username
      likeCount
      commentCount
      createdAt
      likes {
        username
        id
      }
    }
  }
`;

export const FETCH_A_POST = gql`
  query giveMeApost($postId: ID!) {
    post: getPost(postId: $postId) {
      id
      body
      commentCount
      likeCount
      username
      createdAt
      likes {
        id
        username
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export const POST_COMMENT = gql`
  mutation newComment($postId: ID!, $body: String!) {
    post: createComment(postId: $postId, body: $body) {
      id
      body
      commentCount
      likeCount
      username
      createdAt
      likes {
        id
        username
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation newPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      commentCount
      likeCount
    }
  }
`;

export const EDIT_POST = gql`
  mutation updatePost($postId: ID!, $body: String) {
    post: editPost(postId: $postId, body: $body) {
      id
      body
      createdAt
      username
      commentCount
      likeCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($commentId: ID!, $postId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId)
  }
`;

export const LIKE_POST = gql`
  mutation createLikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      username
      likeCount
      commentCount
      createdAt
      likes {
        username
        id
      }
    }
  }
`;

export const LOGIN = gql`
  mutation loginAccount($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      email
      token
      createdAt
    }
  }
`;
