import React from "react";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Loader,
  Message,
} from "semantic-ui-react";
import DeleteButton from "./DeleteButton";
import { LikeButton } from "./LikeButton";
import moment from "moment";
import { gql, useQuery } from "@apollo/client";

export const SinglePost = ({ history, match }) => {
  const { data, loading, error } = useQuery(FETCH_A_POST, {
    variables: {
      postId: match.params.postId,
    },
  });

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

  console.log(data);
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

  const handleCallback = (err) => {
    console.log(err);
  };

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
          {comments.map((comment) => (
            <Card fluid key={comment.id}>
              <Card.Content>
                <Card.Header content={comment.username} />
                <Card.Meta content={moment(createdAt).fromNow()} />
                <Card.Description content={comment.body} />
                <DeleteButton
                  postOrComment={{
                    postId: id,
                    owner: comment.username,
                    commentId: comment.id,
                    callback: handleCallback,
                  }}
                />
              </Card.Content>
            </Card>
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export const FETCH_A_POST = gql`
  query giveMeApost($postId: ID!) {
    post: getPost(postId: $postId) {
      id
      body
      commentCount
      likeCount
      username
      createdAt
      likes {
        id
        username
      }
      comments {
        id
        body
        username
        createdAt
      }
    }
  }
`;
