import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      component={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
