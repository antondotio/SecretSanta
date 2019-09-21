import React, { Component } from 'react';
import './login.css';
import fire from '../config/Fire';
import Home from '../Home/home';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
  } from "react-router-dom";

class Login extends Component {
  constructor (props){
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);

  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Secret Santa
          </p>
          <p className="App-subheader">
            Login
          </p>
        </header>
        <form>
          <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}></input><br></br>
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input><br></br>
          <button type="button" onClick={this.checkLogin}>Login</button><br></br> 
          <Link to="/signup">
              <button type="button">Sign Up</button>
          </Link>
        </form>
      </div>
    );
 
  }

  checkLogin(event) {
    event.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      alert(error.message);
    });
  } 
}

export default Login;
