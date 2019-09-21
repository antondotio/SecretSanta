import React, { Component } from 'react';
import fire from './config/Fire';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import Login from './Login/login';
import Signup from './Signup/signup';
import Home from './Home/home';
import Groups from './Groups/groups';
import CreateGroup from './Groups/creategroup';
import Wishlist from './Wishlist/wishlist';


class App extends Component { 
  constructor(props){
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount(){
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(function(user) {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render () {
    return (
      <div>
        {this.state.user ? (<Home/>) : (<Login/>)} 
        {/* <Router>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/groups" component={Groups}/>
            <Route exact path="/creategroup" component={CreateGroup}/>
            <Route exact path="/wishlist" component={Wishlist}/>
          </Switch>
        </Router> */}
      </div>
      );
  }
}

export default App;
