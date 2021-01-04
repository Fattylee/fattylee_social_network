import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { FormContext } from "../context/postForm";
import { CREATE_POST, EDIT_POST, FETCH_POSTS } from "../utils/query";

const initialValue = {
  body: "",
  id: "",
};
export const PostForm = ({ history }) => {
  const { logout } = useContext(AuthContext);

  const { setError, error, setValue, value, handleInput } = useContext(
    FormContext
  );
  React.useEffect(() => {
    if (value?.id) {
      document.querySelector("#textArea")?.focus();
    }
  }, [value]);
  const [addNewPost, { loading }] = useMutation(
    !value.id ? CREATE_POST : EDIT_POST,
    {
      variables: {
        body: value.body,
        postId: value.id,
      },
      onError(error) {
        console.error(JSON.stringify(error, null, 1), "=======");
        const {
          graphQLErrors: [err],
        } = error;
        if (err?.message?.includes("token")) {
          logout();
          history.push("/login");
        }
        if (err.extensions.code === "BAD_USER_INPUT") {
          return setError(err.extensions.errors);
        }
        setError({ error: err.message });
      },
      update(cache, result) {
        console.log("successful");
        if (!value.id) {
          console.log("post block");
          const data = cache.readQuery({ query: FETCH_POSTS });

          cache.writeQuery({
            query: FETCH_POSTS,
            data: {
              posts: [result.data.createPost, ...data.posts],
            },
          });
        } else {
          console.log("edit block");
        }
        setError({});
        setValue(initialValue);
      },
    }
  );

  function submitPost(e) {
    e.preventDefault();
    addNewPost();
  }

  return (
    <Form loading={loading} size="big" onSubmit={submitPost}>
      <Form.TextArea
        label="What's on your mind?"
        placeholder="What's happening?"
        name="body"
        value={value.body}
        onChange={handleInput}
        error={error.body}
        id="textArea"
      />
      <Button
        loading={loading}
        disabled={loading || !value.body.length}
        color="blue"
      >
        {!value.id ? "Add" : "Edit"} post
      </Button>
      <Button
        content="Cancel"
        disabled={!value.body.length}
        color="teal"
        type="button"
        onClick={() => {
          setValue({ body: "", id: "" });
        }}
      />
    </Form>
  );
};
