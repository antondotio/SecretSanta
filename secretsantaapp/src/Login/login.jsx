import React, { Component } from 'react';
import './login.css';
import fire from '../config/Fire';

import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from "react-router-dom";

  import Signup from '../Signup/signup';

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
    this.signup = this.signup.bind(this);

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
        <Router>
          <Switch>
            <Route exact path="/signup" component={Signup}/>
          </Switch>
        </Router>
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
          <a>&ensp;</a><br></br>
          <button type="button" onClick={this.checkLogin}>Login</button><br></br> 
          <a>&ensp;</a><br></br>
          <button type="button" onClick={this.signup}>Sign Up</button>
        </form>
      </div>
    );
 
  }

  checkLogin(event) {
    event.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      alert(error.message);
    });
  } 

  signup(event){
    event.preventDefault();
    window.location = '/signup';
  }
}

export default Login;
