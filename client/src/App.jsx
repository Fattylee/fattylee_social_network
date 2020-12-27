import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Container } from "semantic-ui-react";

import { Header } from "./components/Header";
import { AuthProvider } from "./context/auth";
import { AuthRoute } from "./context/AuthRoute";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Router>
          <Container>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <ProtectedRoute exact path="/posts" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Router>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
