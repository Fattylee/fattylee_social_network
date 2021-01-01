import { useMutation } from "@apollo/client";
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
import { LIKE_POST } from "../utils/query";

export const LikeButton = ({ post: { likes, id, likeCount }, history }) => {
  const [visibility, setVisibility] = useState(true);

  const { user, logout } = useContext(AuthContext);
  const [likePost] = useMutation(LIKE_POST, {
    onError(error) {
      if (error.message.includes("token")) {
        logout();
        history.push("/login");
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
