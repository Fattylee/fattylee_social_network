import React from "react";
import { Card, Image, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { LikeButton } from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { EditButton } from "./EditButton";
import { CommentButton } from "./CommentButton";

export const Post = ({
  post: { id, body, commentCount, likeCount, username, createdAt, likes },
  history,
}) => {
  return (
    <Card fluid id={id}>
      <Card.Content>
        <Image floated="right" size="mini" src="assets/img/adam.jpg" />
        <Card.Header>{username}</Card.Header>
        <Popup
          content="Click to visit post detailed page"
          trigger={
            <Card.Meta as={Link} to={`/posts/${id}`}>
              {moment(createdAt).fromNow(true)}
            </Card.Meta>
          }
        />

        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <LikeButton post={{ id, likes, likeCount }} history={history} />
          <CommentButton id={id} commentCount={commentCount} />
          <EditButton username={username} post={{ id, body }} />
          <DeleteButton
            postOrComment={{ owner: username, postId: id }}
            history={history}
          />
        </div>
      </Card.Content>
    </Card>
  );
};
