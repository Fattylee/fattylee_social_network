import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "semantic-ui-react";

import { Header } from "./components/Header";
import { SinglePost } from "./pages/SinglePost";
import { AuthProvider } from "./context/auth";
import { AuthRoute } from "./context/AuthRoute";
import { ProtectedRoute } from "./context/ProtectedRoute";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import ApolloProvider from "./utils/apollo";
import { FormProvider } from "./context/postForm";
import { UIContextProvider } from "./context/uiContext";

const App = () => {
  return (
    <UIContextProvider>
      <ApolloProvider>
        <AuthProvider>
          <FormProvider>
            <Router>
              <Container>
                <Header />
                <Switch>
                  <Route exact path="/" component={Home} />
                  {/* testing only */}
                  {/* <ProtectedRoute exact path="/posts" component={Home} /> */}
                  <Route exact path="/posts/:postId" component={SinglePost} />
                  <AuthRoute exact path="/login" component={Login} />
                  <AuthRoute exact path="/register" component={Register} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Router>
          </FormProvider>
        </AuthProvider>
      </ApolloProvider>
    </UIContextProvider>
  );
};

export default App;
