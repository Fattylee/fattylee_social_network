import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Grid, Header, Icon, Message } from "semantic-ui-react";

export const Login = () => {
  const [{ password, username }, setInput] = useState({
    username: "",
    password: "pass",
  });
  const handleChange = (e, { name, value }) => {
    setInput((prev) => ({ ...prev, [name]: value }));
    console.log(username);
    console.log(password);
  };

  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      style={{ background: "white", height: "90vh" }}
    >
      <Grid.Column>
        <Header
          as="h2"
          textAlign="center"
          content="Sign in to your account"
          // image="/assets/img/sarah.jpg"
          color="purple"
          style={{ marginBottom: 32 }}
          icon={{ position: "right", name: "apple", color: "teal" }}
          // iconPosition="right"
        />
        <Form
          size="big"
          loading={false}
          inverted={false}
          success
          error
          onSubmit={(e, ob) => {
            console.log(ob);
            console.log(username, password);
          }}
        >
          <Message header="succesful" content="Welcome to the family" />
          <Form.Input placeholder="enterhe" icon="mail" iconPosition="left" />

          <Form.Input
            error
            label="Enter password"
            labelPosition="left"
            fluid
            placeholder="Your password"
            icon="lock"
            type="password"
          />
          <Form.Group widths="equal">
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="First name"
              name="username"
              value={username}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Last name"
            />
          </Form.Group>
          <Form.Button
            content="Submit"
            size="large"
            icon="hand point right"
            fluid
            color="green"
            style={{ marginBottom: 37 }}
          />
        </Form>
        <p>
          Not a member? <Link to="/register">Sign up now</Link>
        </p>
        <Icon name="hand point right" size="massive" />
      </Grid.Column>
    </Grid>
  );
};
