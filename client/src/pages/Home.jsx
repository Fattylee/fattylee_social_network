import { gql, useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Grid, Loader, Transition } from "semantic-ui-react";
import { Post } from "../components/Post";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS } from "../utils/query";
import { PostForm } from "./PostForm";

window.addEventListener("resize", (e) => {
  console.log("i was resized!");
  console.log(window.innerWidth);
});
export const Home = (props) => {
  const { user } = useContext(AuthContext);
  const { loading, data: { posts } = {}, error } = useQuery(FETCH_POSTS);
  if (error) return <h1>Error page</h1>;
  return (
    <Grid fluid="true">
      <Grid.Row centered>
        <h2>Recent posts</h2>
      </Grid.Row>

      <Grid.Row>
        {user && (
          <Grid.Column
            mobile="16"
            tablet="8"
            computer="5"
            largeScreen="4"
            style={{ marginBottom: 20 }}
          >
            {" "}
            <PostForm {...props} />{" "}
          </Grid.Column>
        )}
        {loading ? (
          <Loader active size="massive"></Loader>
        ) : posts?.length ? (
          <Transition.Group>
            {posts?.map((post) => (
              <Grid.Column
                key={post.id}
                style={{ marginBottom: 20 }}
                mobile="16"
                tablet="8"
                computer="5"
                largeScreen="4"
              >
                <Post post={post} {...props} />
              </Grid.Column>
            ))}
          </Transition.Group>
        ) : (
          <h1>No posts</h1>
        )}
      </Grid.Row>
    </Grid>
  );
};
