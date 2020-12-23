import React from "react";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";

export const Post = ({
  post: { id, body, commentCount, likeCount, username, createdAt },
}) => (
  <Card fluid>
    <Card.Content>
      <Image
        floated="right"
        size="mini"
        src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        label="avatar"
      />
      <Card.Header>{username}</Card.Header>
      <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
      <Card.Description>{body}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className="">
        <Button as="div" labelPosition="right">
          <Button color="red">
            <Icon name="heart" />
            Like
          </Button>
          <Label as="a" basic color="red" pointing="left">
            2,048
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button basic color="blue">
            <Icon name="fork" />
            Fork
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            2,048
          </Label>
        </Button>
      </div>
    </Card.Content>
  </Card>
);
