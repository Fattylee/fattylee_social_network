import { decode } from "jsonwebtoken";
import { createContext, useEffect, useReducer } from "react";

const AuthContext = createContext({
  user: null,
  login: (userData) => null,
  logout: () => null,
});

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

const getInitialState = () => {
  const initialState = { user: null };
  const token = localStorage.getItem("jwtToken");
  if (token) {
    const decodedToken = decode(token);
    if (!decodedToken) {
      return initialState;
    }
    console.log({ decodedToken, now: Date.now() / 1000 });
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("jwtToken");
    } else {
      initialState.user = decodedToken;
    }
  }
  return initialState;
};

const AuthProvider = (props) => {
  const [{ user }, dispatch] = useReducer(reducer, null, getInitialState);

  useEffect(() => {
    if (user) {
      localStorage.setItem("jwtToken", user.token);
    } else {
      localStorage.removeItem("jwtToken");
    }
  }, [user]);

  const login = (userData) => dispatch({ type: "LOGIN", payload: userData });
  const logout = () => dispatch({ type: "LOGOUT" });

  return <AuthContext.Provider value={{ login, logout, user }} {...props} />;
};

export { AuthContext, AuthProvider };
