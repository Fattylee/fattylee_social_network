import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Container } from "semantic-ui-react";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

const initialState = { isAuthenticated: false, user: null };

export const AuthContext = createContext();

const App = () => {
  const [auth, setAuth] = useState(initialState);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <ApolloProvider client={client}>
        <Router>
          <Container>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Redirect to="/login" />
            </Switch>
          </Container>
        </Router>
      </ApolloProvider>
    </AuthContext.Provider>
  );
};

export default App;
