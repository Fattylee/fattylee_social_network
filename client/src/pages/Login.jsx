import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Form, Grid, Header, Message } from "semantic-ui-react";
import { useForm } from "../utils/hoks";

const initialValue = {
  username: "",
  password: "",
  confirm_password: "",
  email: "",
};

export const Login = (props) => {
  const {
    error,
    setError,
    value,
    setValue,
    handleSubmit,
    handleInput,
  } = useForm(initialValue, handleRegisterUser);

  const [loginUser, { loading }] = useMutation(LOGIN, {
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

  function handleRegisterUser() {
    loginUser();
  }
  return (
    <div>
      <Grid verticalAlign="middle" style={{ height: "70vh" }}>
        <Grid.Column>
          <Card raised fluid style={{ maxWidth: 700, margin: "auto" }}>
            <Card.Content>
              <Header
                textAlign="center"
                content="Login to Account"
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
                <Message success header="Success" content="Login successful" />

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
                <Form.Button content="Login" fluid size="large" color="green" />

                <Message error header="Fixs all errors" content={error.error} />
              </Form>
              <p style={{ marginTop: 30, textAlign: "center" }}>
                Not a member? <Link to="/register">Sign up now</Link>
              </p>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </div>
  );
};

const LOGIN = gql`
  mutation loginAccount($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
      createdAt
    }
  }
`;
