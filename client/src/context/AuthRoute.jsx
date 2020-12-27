import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./auth";

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      component={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
