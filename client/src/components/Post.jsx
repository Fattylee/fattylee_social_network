import React, { useContext } from "react";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { FETCH_POSTS } from "../pages/Home";
import { AuthContext } from "../context/auth";

export const Post = ({
  post: { id, body, commentCount, likeCount, username, createdAt, likes },
}) => {
  const { user } = useContext(AuthContext);
  const [likePost] = useMutation(LIKE_POST, {
    onError({ graphQLErrors: [err] }) {
      console.log(err.message);
    },
  });

  const handleLike = (e) => {
    likePost({
      variables: {
        postId: id,
      },
      refetchQueries: [{ query: FETCH_POSTS }],
      update(cache, result) {
        console.log("===============result============");
        console.log(result);
      },
    });
  };
  return (
    <Card fluid>
      <Card.Content>
        <Image floated="right" size="mini" src="assets/img/adam.jpg" />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to="/papa">
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="">
          <Button as="div" labelPosition="right">
            <Button
              basic={
                likes.find(
                  (l) =>
                    l.username.toLowerCase() === user.username.toLowerCase()
                )
                  ? false
                  : true
              }
              color="teal"
              onClick={handleLike}
            >
              <Icon name="heart" />
            </Button>
            <Label as="a" basic color="teal" pointing="left">
              {likeCount}
            </Label>
          </Button>
          <Button as="div" labelPosition="right">
            <Button basic color="blue">
              <Icon name="comments" />
            </Button>
            <Label as="a" basic color="blue" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export const LIKE_POST = gql`
  mutation createLikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      username
      likeCount
      commentCount
      createdAt
      likes {
        username
        id
      }
    }
  }
`;
