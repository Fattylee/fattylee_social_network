import { gql, useMutation } from "@apollo/client";
import React, { useContext, useEffect, useRef } from "react";
import { Button, Form, Ref } from "semantic-ui-react";
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
  const textArea = useRef(null);

  useEffect(() => {
    if (value?.id) {
      const box = textArea.current.querySelector("textarea");
      const len = box.value.length;
      box?.focus();
      box?.setSelectionRange(len, len);
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
        if (!value.id) {
          // const data = cache.readQuery({ query: FETCH_POSTS });

          // cache.writeQuery({
          //   query: FETCH_POSTS,
          //   data: {
          //     posts: [result.data.createPost, ...data.posts],
          //   },
          // });
          // investigate later why it is not working
          cache.modify({
            fields: {
              getPosts(existingPosts = []) {
                const newPostRef = cache.writeFragment({
                  data: result.data.createPost,
                  fragment: gql`
                    fragment newPost on Post {
                      id
                      body
                      createdAt
                      username
                      commentCount
                      likeCount
                    }
                  `,
                });
                return [newPostRef, ...existingPosts];
              },
            },
          });
        } else {
          focusAndBlink(value);
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
      <Ref innerRef={textArea}>
        <Form.TextArea
          label="What's on your mind?"
          placeholder="What's happening?"
          name="body"
          value={value.body}
          onChange={handleInput}
          error={error.body}
          id="textArea"
        />
      </Ref>
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

function focusAndBlink(value) {
  const updatedPost = document.getElementById(value.id);
  updatedPost?.querySelector("button")?.focus();
  updatedPost?.classList.add("my-flash");
  setTimeout(() => {
    // remove animation after 3s
    updatedPost?.classList.remove("my-flash");
  }, 3000);
}
