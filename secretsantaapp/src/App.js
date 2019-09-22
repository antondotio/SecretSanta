import React, { Component } from 'react';
import fire from './config/Fire';
import Login from './Login/login';
import Home from './Home/home';

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
        {this.state.user ? (<Home/>) : (<Login/>)}  
      </div>
    );
  }
}

export default App;
