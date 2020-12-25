import React, { useState } from "react";
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

export const Post = ({
  post: { id, body, commentCount, likeCount, username, createdAt },
}) => {
  const [toggleBasic, setToggleBasic] = useState(true);
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
              basic={toggleBasic}
              color="teal"
              onClick={(e) => {
                setToggleBasic(!toggleBasic);
              }}
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
