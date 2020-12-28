import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useForm } from "../utils/hooks";
import { FETCH_POSTS } from "./Home";

const initialValue = {
  body: "",
};
export const PostForm = () => {
  const {
    setError,
    error,
    setValue,
    value,
    handleSubmit,
    handleInput,
  } = useForm(initialValue, submitPost);

  const [addNewPost, { loading }] = useMutation(CREATE_POST, {
    variables: value,
    onError({ graphQLErrors: [err] }) {
      if (err.message?.includes("token")) {
        // props.history.push("/login");
        // check for expired token
      }
      if (err.extensions.code === "BAD_USER_INPUT") {
        return setError(err.extensions.errors);
      }
      setError({ error: err.message });
    },
    update(proxy, result) {
      const data = proxy.readQuery({ query: FETCH_POSTS });

      proxy.writeQuery({
        query: FETCH_POSTS,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      setError({});
      setValue(initialValue);
    },
  });

  function submitPost() {
    addNewPost();
  }

  return (
    <Form
      error={!!Object.keys(error || {}).length}
      loading={loading}
      size="big"
      onSubmit={handleSubmit}
    >
      <Form.TextArea
        label="New post"
        placeholder="New post"
        name="body"
        value={value.body}
        onChange={handleInput}
        error={error.body}
      />
      <Button color="blue">Add post</Button>

      <Message error header="Fix all errors" content={error.error} />
    </Form>
  );
};

const CREATE_POST = gql`
  mutation newPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      commentCount
      likeCount
    }
  }
`;
