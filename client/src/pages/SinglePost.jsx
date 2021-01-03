import React, { useContext } from "react";
import {
  Button,
  Card,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Loader,
  Message,
  Transition,
} from "semantic-ui-react";
import DeleteButton from "../components/DeleteButton";
import { LikeButton } from "../components/LikeButton";
import moment from "moment";
import { useMutation, useQuery } from "@apollo/client";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
import { FETCH_A_POST, POST_COMMENT } from "../utils/query";
import { Link } from "react-router-dom";

export const SinglePost = ({ history, match }) => {
  const { data, loading, error } = useQuery(FETCH_A_POST, {
    variables: {
      postId: match.params.postId,
    },
  });
  const { user, logout } = useContext(AuthContext);

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

  if (loading) return <Loader size="large" />;
  if (error)
    return (
      <Message
        error
        icon="fire extinguisher"
        content={JSON.stringify(error, null, 2)}
      />
    );

  if (!data.post)
    return (
      <Message warning>
        <Header className="gutterBottom" content="Hoops! post not found" />
        <Button
          onClick={() => history.goBack()}
          content="Go back"
          icon="backward"
          color="olive"
        />
      </Message>
    );

  const {
    post: {
      id,
      body,
      commentCount,
      likeCount,
      username,
      createdAt,
      likes,
      comments,
    },
  } = data;

  return (
    <Grid className="gutterTop">
      <Grid.Row columns="equal">
        <Grid.Column width={4}>
          <Image
            rounded
            floated="right"
            size="massive"
            src="../../assets/img/adam.jpg"
          />
        </Grid.Column>
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div>
                <LikeButton post={{ id, likes, likeCount }} history={history} />
                <Button as="div" labelPosition="right">
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label as="a" basic color="blue" pointing="left">
                    {commentCount}
                  </Label>
                </Button>
                <DeleteButton
                  postOrComment={{ owner: username, postId: id }}
                  history={history}
                />
              </div>
            </Card.Content>
          </Card>
          {user && !commentCount && (
            <Header
              content="Be the first to comment"
              size="tiny"
              color="grey"
              as="p"
            />
          )}
          {!user && (
            <>
              <Link to="/login">Login</Link> to comment
            </>
          )}
          {user && (
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
          )}

          <Transition.Group>
            {comments?.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  <Card.Header content={comment.username} />
                  <Card.Meta content={moment(comment.createdAt).fromNow()} />
                  <Card.Description content={comment.body} />
                  <DeleteButton
                    postOrComment={{
                      postId: id,
                      owner: comment.username,
                      commentId: comment.id,
                    }}
                    history={history}
                  />
                </Card.Content>
              </Card>
            ))}
          </Transition.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};
