import React, { Component } from 'react';
import './App.css';

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

class App extends Component { 
  render () {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/home" component={Home}/>
          </Switch>
        </Router>
      );
  }
}

export default App;
