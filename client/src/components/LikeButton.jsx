import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import {
  Button,
  Icon,
  Label,
  List,
  Popup,
  Transition,
} from "semantic-ui-react";

import { AuthContext } from "../context/auth";

export const LikeButton = ({ post: { likes, id, likeCount }, history }) => {
  const [visibility, setVisibility] = useState(true);
  // console.log({ likes, id, likeCount });

  const { user, logout } = useContext(AuthContext);
  const [likePost] = useMutation(LIKE_POST, {
    onError(error) {
      console.error(JSON.stringify(error, null, 1), "=======");
      const {
        graphQLErrors: [err],
      } = error;
      console.log(err.message);
      if (err.message.includes("token")) {
        console.log("i got here");
        // delete the expired/invalid token
        // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZTFhYTFjYjI2M2RiMjc5YjUwMzg1ZCIsInVzZXJuYW1lIjoiZmF0dHlsZWUiLCJlbWFpbCI6Imp0dEBnbWFpbC5jb20iLCJpYXQiOjE2MDkyNjI0ODIsImV4cCI6MTYwOTI2NjA4Mn0.Bz1lVwBqmInhxXus6eDbJrEYQzq1X2ZiAglE12HE8Tc
        logout();
        return history.push("/login");
      }
    },
  });

  const handleLike = (e) => {
    setVisibility((prev) => !prev);
    likePost({
      variables: {
        postId: id,
      },
    });
  };
  return (
    <Button as="div" labelPosition="right">
      <Transition animation="shake" visible={visibility}>
        <Button
          basic={
            likes?.find(
              (l) => l.username.toLowerCase() === user?.username.toLowerCase()
            )
              ? false
              : true
          }
          color="teal"
          onClick={handleLike}
        >
          <Icon name="heart" />
        </Button>
      </Transition>
      <Popup
        content={
          <List>
            {likes?.length ? (
              likes.map((l) => <List.Item content={l.username} key={l.id} />)
            ) : (
              <span style={{ textDecoration: "line-through" }}>None</span>
            )}
          </List>
        }
        trigger={
          <Label as="a" basic color="teal" pointing="left">
            {likeCount}
          </Label>
        }
      />
    </Button>
  );
};

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
