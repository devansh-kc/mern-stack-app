import React from "react";
import Home from "./components/Home/Home";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";

import { getPosts } from "./actions/posts";

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
