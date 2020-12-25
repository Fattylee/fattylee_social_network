import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Button, Grid, Icon, Label, Loader } from "semantic-ui-react";
import { Post } from "../components/Post";

export const Home = () => {
  const { loading, data: { getPosts: posts } = {}, error } = useQuery(
    FETCH_POSTS
  );
  if (error) return <h1>Error page</h1>;

  return (
    <Grid fluid="true" columns={3}>
      <Grid.Row centered>
        <h2>Recent posts</h2>
        <Label content="Great way to get started!" color="teal" corner />
        <Button
          content="Abu"
          color="orange"
          // icon={(Comp, props) => <Comp {...props} color="violet" name="meh" />} // deprecated
        />
        <Button
          content="me dem"
          label="sweet"
          color="vk"
          labelPosition="left"
          circular
          icon="computer"
          negative
        />
        <a href="/" className="ui button facebook massive">
          Next line &nbsp;&nbsp;
          <Icon name="computer" />
        </a>
        <Button
          content="Last one"
          color="brown"
          size="medium"
          label="go"
          labelPosition="left"
          icon={{ name: "save", color: "black" }}
        />
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
