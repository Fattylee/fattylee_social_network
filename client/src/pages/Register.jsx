import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Grid, Header, Message } from "semantic-ui-react";

const initialValue = {
  username: "",
  password: "",
  confirm_password: "",
  email: "",
};

export const Register = (props) => {
  const [error, setError] = useState({});
  const [value, setValue] = useState(initialValue);

  const [registerUser, { loading }] = useMutation(REGISTER, {
    update(_, result) {
      setError({});
      setValue(initialValue);
      setTimeout(() => {
        props.history.push("/");
      }, 200);
    },
    onError(error) {
      setError(error.graphQLErrors[0].extensions.errors);
    },
    variables: value,
  });

  const handleInput = (e, { name, value }) => {
    setValue((prevSate) => ({ ...prevSate, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div>
      <Grid verticalAlign="middle" style={{ height: "70vh" }}>
        <Grid.Column>
          <Card raised fluid style={{ maxWidth: 700, margin: "auto" }}>
            <Card.Content>
              <Header
                textAlign="center"
                content="Register for a new Account"
                image="assets/img/sarah.jpg"
              />

              <Form
                autoComplete="true"
                onSubmit={handleSubmit}
                noValidate
                loading={loading}
                success={false}
                error={!!Object.keys(error).length}
                size="big"
              >
                <Message success header="Success" content="Sign up completed" />

                <Form.Group widths="equal">
                  <Form.Input
                    type="text"
                    name="username"
                    placeholder="Your username"
                    icon="user"
                    error={error.username}
                    value={value.username}
                    onChange={handleInput}
                    label="Username"
                    required={!!error.username}
                  />
                  <Form.Input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    icon="mail"
                    error={error.email}
                    value={value.email}
                    onChange={handleInput}
                    label="Email"
                    required={!!error.email}
                  />
                </Form.Group>
                <Form.Input
                  type="password"
                  name="password"
                  placeholder="Your password"
                  icon="lock"
                  error={error.password}
                  value={value.password}
                  onChange={handleInput}
                  label="Password"
                  required={!!error.password}
                />
                <Form.Input
                  type="password"
                  name="confirm_password"
                  placeholder="Confiirm password"
                  icon="lock"
                  error={error.confirm_password}
                  onChange={handleInput}
                  value={value.confirm_password}
                  label="Confirm password"
                  required={!!error.confirm_password}
                />
                <Form.Button
                  content="Submit"
                  fluid
                  size="large"
                  color="green"
                />

                <Message error header="Fixs all errors" content={error.error} />
              </Form>

              <p style={{ marginTop: 30, textAlign: "center" }}>
                Already have an Account?{" "}
                <Link to="/login">Login to your Account</Link>
              </p>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const REGISTER = gql`
  mutation createAccount(
    $username: String!
    $password: String!
    $confirm_password: String!
    $email: String!
  ) {
    register(
      data: {
        username: $username
        password: $password
        confirm_password: $confirm_password
        email: $email
      }
    ) {
      id
      username
      token
    }
  }
`;
