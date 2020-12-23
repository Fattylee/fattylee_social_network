import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Grid, Image, Loader } from "semantic-ui-react";
import { Post } from "../components/Post";

export const Home = () => {
  const { loading, data: { getPosts: posts } = {}, error } = useQuery(
    FETCH_POSTS
  );
  console.log(loading);
  console.log(posts);
  console.log(error);
  if (error) return <h1>Error page</h1>;

  return (
    <Grid fluid columns={3}>
      <Grid.Row>
        <h2>Recent posts</h2>
      </Grid.Row>

      <Grid.Row>
        {loading ? (
          <Loader active size="massive"></Loader>
        ) : posts?.length ? (
          posts?.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <Post post={post} />
            </Grid.Column>
          ))
        ) : (
          <h1>No posts</h1>
        )}
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS = gql`
  query getPost {
    getPosts {
      id
      body
      username
      likeCount
      commentCount
      createdAt
    }
  }
`;
