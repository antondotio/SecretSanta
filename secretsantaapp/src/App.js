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

class App extends Component { 
  render () {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
          </Switch>
        </Router>
      );
  }
}

export default App;
