import { useQuery } from "@apollo/client";
import React, { useContext } from "react";
import { Grid, Loader, Transition } from "semantic-ui-react";
import { FictionPage } from "../components/FictionPage";
import { Post } from "../components/Post";
import { AuthContext } from "../context/auth";
import { useViewpoint } from "../utils/hooks";
import { FETCH_POSTS } from "../utils/query";
import { PostForm } from "./PostForm";

export const Home = (props) => {
  const screen = useViewpoint();
  const { user } = useContext(AuthContext);
  const { loading, data: { posts } = {}, error } = useQuery(FETCH_POSTS, {
    // pollInterval: 500,
  });

  if (error) return <h1>Error page</h1>;
  return (
    <Grid fluid="true">
      <Grid.Row centered>
        {/* <Icon name="write" /> */}
        <h2>Recent posts</h2>
        <FictionPage />
      </Grid.Row>

      <Grid.Row columns={screen === "mobile" ? 1 : screen === "tablet" ? 2 : 3}>
        {user && (
          <Grid.Column style={{ marginBottom: 20 }}>
            {" "}
            <PostForm {...props} />{" "}
          </Grid.Column>
        )}
        {loading ? (
          <Loader active size="massive"></Loader>
        ) : posts?.length ? (
          <Transition.Group>
            {posts?.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <Post post={post} {...props} />
              </Grid.Column>
            ))}
          </Transition.Group>
        ) : (
          <h1>Nothing to see here...yet.</h1>
        )}
      </Grid.Row>
    </Grid>
  );
};
