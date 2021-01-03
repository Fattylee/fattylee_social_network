import { useMutation } from "@apollo/client";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Grid, Header, Message } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

import { useForm } from "../utils/hooks";
import { LOGIN } from "../utils/query";

const initialValue = {
  username: "",
  password: "",
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

  const context = useContext(AuthContext);
  const [loginAction, { loading }] = useMutation(LOGIN, {
    update(_, result) {
      setError({});
      setValue(initialValue);
      const user = result.data.login;
      context.login(user);
      props.history.push("/");
    },
    onError(error) {
      if (error.graphQLErrors[0].extensions.code === "BAD_USER_INPUT") {
        return setError(error.graphQLErrors[0].extensions.errors);
      }
      setError({ error: error.graphQLErrors[0].message });
    },
    variables: value,
  });

  function handleRegisterUser() {
    loginAction();
  }
  return (
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

              <Message error header="Fix all errors" content={error.error} />
            </Form>
            <p style={{ marginTop: 30, textAlign: "center" }}>
              Not a member? <Link to="/register">Sign up now</Link>
            </p>
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
};
