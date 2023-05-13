import React from "react";
import Home from "./components/Home/Home";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar.js";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
/* Retrieving the user profile data from the browser's local storage and parsing it from a JSON string
to a JavaScript object, and assigning it to the `user` constant. */
  const user=  JSON.parse(localStorage.getItem("profile"))    
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={()=><Redirect to="/posts" />} />
          <Route path= "/posts" exact component= {Home}/>
          <Route path= "/posts/search" exact component= {Home}/>
          <Route path= "/posts/:id" component= {PostDetails}/>

          <Route path="/auth" exact component={()=>(!user?<Auth/>:<Redirect to ="/posts"/>)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
