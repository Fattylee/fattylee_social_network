import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Grid, Loader } from "semantic-ui-react";
import { Post } from "../components/Post";
import Todo from "../components/Todo";

const state = { name: "fattylee", age: 31 };
const PersonContext = React.createContext();
const Lume = () => {
  const { name } = React.useContext(PersonContext);
  return (
    <h1>
      Hi,{" "}
      <PersonContext.Consumer>{(value) => value.name}</PersonContext.Consumer>
    </h1>
  );
};
const Bar = () => {
  return (
    <PersonContext.Provider value={state}>
      <Lume />
    </PersonContext.Provider>
  );
};
export const Home = () => {
  const { loading, data: { getPosts: posts } = {}, error } = useQuery(
    FETCH_POSTS
  );
  if (error) return <h1>Error page</h1>;

  return (
    <Grid fluid="true" columns={3}>
      <Grid.Row centered>
        <h2>Recent posts</h2>
        <Bar />
        <Todo />
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
