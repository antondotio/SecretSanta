import React, { Component } from 'react';
import fire from './config/Fire';
import Login from './Login/login';
import Homepage from './homepage';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

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
    fire.auth().onAuthStateChanged((user) => {
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
        {this.state.user ? (<Homepage/>) : (<Login/>)}  
      </div>
    );
  }
}

export default App;
