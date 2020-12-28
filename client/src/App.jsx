import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { Header } from "./components/Header";
import { AuthProvider } from "./context/auth";
import { AuthRoute } from "./context/AuthRoute";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import ApolloProvider from "./utils/apollo";

const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider>
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
