import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS } from "../pages/Home";

const DeleteButton = ({
  postOrComment: { owner, postOrCommentId },
  history,
}) => {
  const { user, logout } = useContext(AuthContext);
  const [toggleVisibility, setToggleVisibility] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    variables: {
      postId: postOrCommentId,
    },
    onError(error) {
      console.error(JSON.stringify(error, null, 1));
      if (error.message.includes("token")) {
        logout();
        history.push("/login");
      }
    },
    update(cache) {
      setToggleVisibility(false);
      const data = cache.readQuery({ query: FETCH_POSTS });
      cache.writeQuery({
        query: FETCH_POSTS,
        data: {
          posts: data.posts.filter((post) => post.id !== postOrCommentId),
        },
      });
    },
  });
  const handleDelete = (e) => {
    deletePost();
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

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
