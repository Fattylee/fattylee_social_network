import { userInfo } from "os";
import React from "react";
const input = document.querySelector(".input") as HTMLInputElement;
input.valueAsNumber;

let initialState = { user: null };
const token = localStorage.getItem("jwtToken");
if (token) {
  const decoded = jwt.decode(token);
  if (decoded.exp * 1000 < new Date().getTime()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decoded;
  }
}

const AuthContext = React.createContext({
  user: null,
  login: (userData) => null,
  logout: () => null,
});

const AuthProvider = (props) => {
  const [{ user }, setUser] = React.useState(initialState);

  const login = (userData) => {
    localStorage.jwtToken = userData.token;
    setUser((prev) => ({ ...prev, user: userData }));
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
    setUser((prev) => ({ ...prev, user: null }));
  };
  return <AuthContext.Provider value={{ user, login, logout }} {...props} />;
};

export { AuthContext, AuthProvider };
