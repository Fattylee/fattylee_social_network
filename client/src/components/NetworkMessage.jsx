import React from "react";
import { Button, Header, Message } from "semantic-ui-react";

export const NetworkMessage = ({ history }) => {
  const handleReload = () => {
    history.push("/temp");
    history.goBack();
  };

  return (
    <Message style={{ textAlign: "center" }} className="gutterBottom">
      <Header className="gutterBottom">
        Hmm...
        <br />
        something went wrong.
      </Header>
      <p className="gutterBottom">
        There aren't any Tweets here, and there should be. Double-check your
        internet connexion, then try again.
      </p>
      <Button onClick={handleReload} basic color="black" content="Try again" />
    </Message>
  );
};
