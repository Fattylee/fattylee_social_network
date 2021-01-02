import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import { CREATE_POST, FETCH_POSTS } from "../utils/query";

const initialValue = {
  body: "",
};
export const PostForm = (props) => {
  const {
    setError,
    error,
    setValue,
    value,
    handleSubmit,
    handleInput,
  } = useForm(initialValue, submitPost);

  const { logout } = useContext(AuthContext);

  const [addNewPost, { loading }] = useMutation(CREATE_POST, {
    variables: value,
    onError(error) {
      console.error(JSON.stringify(error, null, 1), "=======");
      const {
        graphQLErrors: [err],
      } = error;
      if (err.message?.includes("token")) {
        // check for expired token
        logout();
        props.history.push("/login");
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
          posts: [result.data.createPost, ...data.posts],
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
