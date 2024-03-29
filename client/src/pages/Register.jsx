import { gql, useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Form, Grid, Header, Icon, Message } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

const initialValue = {
  username: "",
  password: "",
  confirm_password: "",
  email: "",
};

export const Register = (props) => {
  const context = useContext(AuthContext);
  const { error, setError, value, setValue, handleSubmit, handleInput } =
    useForm(initialValue, handleRegisterUser);
  const [togglePassword, setTogglePassword] = useState(false);
  const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false);

  const [registerUser, { loading }] = useMutation(REGISTER, {
    update(_, { data: { register: userData } }) {
      setError({});
      setValue(initialValue);
      props.history.push("/");
      context.login(userData);
    },
    onError({ graphQLErrors: [err] }) {
      if (err.extensions.code === "BAD_USER_INPUT")
        return setError(err.extensions.errors);

      setError({ error: err.message });
    },
    variables: value,
  });

  function handleRegisterUser() {
    registerUser();
  }
  return (
    <div>
      <Grid verticalAlign="middle" style={{ height: "70vh" }}>
        <Grid.Column>
          <Card raised fluid style={{ maxWidth: 700, margin: "auto" }}>
            <Card.Content>
              <div style={{ textAlign: "center" }}>
                <Icon name="user plus" size="huge" />
              </div>
              <Header
                textAlign="center"
                content="Register for a new Account"
                size="huge"
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
                  type={togglePassword ? "text" : "password"}
                  name="password"
                  placeholder="Your password"
                  icon={
                    <Icon
                      link
                      name={togglePassword ? "eye" : "eye slash"}
                      onClick={(e) => setTogglePassword(!togglePassword)}
                    />
                  }
                  error={error.password}
                  value={value.password}
                  onChange={handleInput}
                  label="Password"
                  required={!!error.password}
                />
                <Form.Input
                  type={toggleConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Confiirm password"
                  icon={
                    <Icon
                      link
                      name={toggleConfirmPassword ? "eye" : "eye slash"}
                      onClick={(e) =>
                        setToggleConfirmPassword(!toggleConfirmPassword)
                      }
                    />
                  }
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

                <Message error header="Fix all errors" content={error.error} />
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
      email
      token
    }
  }
`;
