import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import Login from './Login/login';
import Signup from './Signup/signup';
import Home from './Home/home'
import Groups from './Groups/groups'
import Wishlist from './Wishlist/wishlist'

class App extends Component { 
  render () {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/groups" component={Groups}/>
            <Route exact path="/wishlist" component={Wishlist}/>
          </Switch>
        </Router>
      );
  }
}

export default App;
