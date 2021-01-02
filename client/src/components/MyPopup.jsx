import React from "react";
import { Popup } from "semantic-ui-react";

export const MyPopup = ({ content, children }) => {
  return <Popup content={content} trigger={children} />;
};
