import React, { useContext } from "react";
import {
  Button,
  Card,
  Grid,
  Header,
  Image,
  Loader,
  Message,
  Transition,
} from "semantic-ui-react";
import DeleteButton from "../components/DeleteButton";
import { LikeButton } from "../components/LikeButton";
import moment from "moment";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { FETCH_A_POST } from "../utils/query";
import { Link } from "react-router-dom";
import { CommentForm } from "../components/CommentForm";
import { NetworkMessage } from "../components/NetworkMessage";
import { EditButton } from "../components/EditButton";
import { CommentButton } from "../components/CommentButton";

export const SinglePost = ({ history, match }) => {
  const { data, loading, error } = useQuery(FETCH_A_POST, {
    variables: {
      postId: match.params.postId,
    },
  });
  const { user } = useContext(AuthContext);

  if (loading) return <Loader active size="massive" />;
  if (error) return <NetworkMessage history={history} />;

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
                <CommentButton commentCount={commentCount} id={id} />
                <EditButton
                  username={username}
                  post={{ id, body }}
                  history={history}
                />
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
          {user && <CommentForm history={history} match={match} />}

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
