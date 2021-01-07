import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Icon, Label } from "semantic-ui-react";
import { useViewpoint } from "../utils/hooks";
import { MyPopup } from "./MyPopup";

export const CommentButton = ({ id, commentCount }) => {
  const breakPoint = useViewpoint();
  const btnSize = breakPoint === "mobile" ? "tiny" : "medium";
  return (
    <MyPopup content="comments on a post">
      <Button size={btnSize} as="div" labelPosition="right">
        <Button size={btnSize} as={Link} to={`posts/${id}`} basic color="blue">
          <Icon name="comments" />
        </Button>
        <Label size={btnSize} as="a" basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    </MyPopup>
  );
};
