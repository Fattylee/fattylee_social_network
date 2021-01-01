import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import {
  DELETE_COMMENT,
  DELETE_POST,
  FETCH_POSTS,
  FETCH_A_POST,
} from "../utils/query";

const DeleteButton = ({
  postOrComment: { owner, postId, callback, commentId },
  history,
}) => {
  const { user, logout } = useContext(AuthContext);
  const [toggleVisibility, setToggleVisibility] = useState(false);

  const [deletePostOrComment] = useMutation(
    commentId ? DELETE_COMMENT : DELETE_POST,
    {
      variables: {
        postId,
        commentId,
      },
      onError(error) {
        setToggleVisibility(false);
        if (callback) callback(error);
        console.error(JSON.stringify(error, null, 1));
        if (error.message.includes("token")) {
          logout();
          history.push("/login");
        }
      },
      update(cache) {
        setToggleVisibility(false);
        if (!commentId) {
          // delete post action
          const queryArgs = { query: FETCH_POSTS };
          const data = cache.readQuery(queryArgs);
          const result = data.posts.filter((p) => p.id !== postId);
          cache.writeQuery({
            ...queryArgs,
            data: {
              posts: result,
            },
          });

          history.push("/");
        } else {
          const data = cache.readQuery({
            query: FETCH_A_POST,
            variables: { postId },
          });

          cache.writeQuery({
            query: FETCH_A_POST,
            variables: { postId },
            data: {
              post: {
                ...data.post,
                comments: data.post.comments.filter((c) => c.id !== commentId),
                commentCount: data.post.commentCount - 1,
              },
            },
          });
        }
      },
    }
  );

  const handleDelete = (e) => {
    deletePostOrComment();
  };

  return (
    user?.username.toLowerCase() === owner.toLowerCase() && (
      <>
        {" "}
        <Confirm
          onConfirm={handleDelete}
          onCancel={() => setToggleVisibility(false)}
          open={toggleVisibility}
        />
        <Button
          onClick={() => setToggleVisibility(true)}
          color="red"
          basic
          icon={{ name: "trash" }}
          floated="right"
        />
      </>
    )
  );
};

export default DeleteButton;
