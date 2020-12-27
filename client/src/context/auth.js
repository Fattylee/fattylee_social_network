import { decode } from "jsonwebtoken";
import { createContext, useReducer } from "react";

const initialState = { user: null };
const token = localStorage.getItem("jwtToken");
if (token) {
  const decodedToken = decode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}
const AuthContext = createContext({
  user: null,
  login: (userData) => null,
  logout: () => null,
});

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("jwtToken", action.payload.token);
      return { ...state, user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("jwtToken");
      return { ...state, user: null };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [{ user }, dispatch] = useReducer(reducer, initialState);
  const login = (userData) => dispatch({ type: "LOGIN", payload: userData });
  const logout = () => dispatch({ type: "LOGOUT" });

  return (
    <AuthContext.Provider
      value={{ login, logout, user }}
      {...props}
    ></AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
