import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Form, Message } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import { FETCH_A_POST, POST_COMMENT } from "../utils/query";

export const CommentForm = ({ history, match }) => {
  const { logout } = useContext(AuthContext);
  const [
    addComment,
    { loading: commentLoading, error: commentError },
  ] = useMutation(POST_COMMENT, {
    onError(error) {
      console.log(JSON.stringify(error, null, 2));
      if (error.message.includes("token")) {
        logout();
        history.push("/login");
      }
    },
  });
  console.log("error comment", commentError?.message);

  const { handleSubmit, handleInput, value, error: formError } = useForm(
    {
      body: "",
    },
    handleComment
  );

  function handleComment() {
    addComment({
      update(cache, result) {
        value.body = "";

        cache.writeQuery({
          query: FETCH_A_POST,
          variables: {
            postId: match.params.postId,
          },
          data: {
            post: result.data.post,
          },
        });
      },
      variables: {
        postId: match.params.postId,
        body: value.body,
      },
    });
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.TextArea
        onChange={handleInput}
        value={value.body}
        name="body"
        placeholder="Write a public comment..."
        error={formError.body}
      />
      <Form.Button
        disabled={commentLoading || !value.body.length}
        icon="send"
        size="large"
        color="blue"
        content="Send"
        loading={commentLoading}
      />
      {commentError?.message?.includes("Failed to fetch") && (
        <Message
          negative
          content="Network error, check your internet connextion and try again."
        />
      )}
    </Form>
  );
};
