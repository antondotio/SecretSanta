import React, { Component } from 'react';
import './signup.css';
import fire from '../config/Fire';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";


class Signup extends Component {

  constructor(props){
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      complete: false,
    };

    this.handleFnameChange = this.handleFnameChange.bind(this);
    this.handleLnameChange = this.handleLnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleUnameChange = this.handleUnameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCpasswordChange = this.handleCpasswordChange.bind(this);

  }

  handleFnameChange(event){
    this.setState({firstName: event.target.value});
  }

  handleLnameChange(event){
    this.setState({lastName: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handleUnameChange(event){
    this.setState({username: event.target.value});
  }
  
  handlePasswordChange(event){
    this.setState({password: event.target.value});
  }

  handleCpasswordChange(event){
    this.setState({confirmPassword: event.target.value});
  }

  render() {
    return (
      <div className="Signup">
        <header className="Signup-header">
          <p>
            Secret Santa
          </p>
          <p className="App-subheader">
            Sign Up
          </p>
        </header>
        <form>
          <input type="text" placeholder="First Name" value={this.state.firstName} onChange={this.handleFnameChange}></input>
          <input type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.handleLnameChange}></input><br></br>
          <input type="text" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} ></input><br></br>
          <input type="text" placeholder="Username" value={this.state.userName} onChange={this.handleUnameChange}></input><br></br>
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}></input><br></br>
          <input type="password" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleCpasswordChange}></input><br></br>
          <Link to="/">
            <button type="button" onClick={() => this.signUp()}>Sign Up</button><br></br>
          </Link> 
        </form>
      </div>
    );
  }
  
  signUp() {
    if(!this.state.firstName || !this.state.lastName || !this.state.username || !this.state.email
      || !this.state.password || !this.state.confirmPassword) {
      alert("must fill in all text fields");
    } else {
        if(this.state.confirmPassword == this.state.password) {
          fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            // Deal with error if the new user already exists
            var errorCode = error.code;
            var errorMessage = error.message;
          });
          this.saveNewUser();
      }
    }
  }

  saveNewUser() {
    fire.firestore().collection("users").add({
      //id: fire.auth().currentUser().getUid(),
      email: this.state.email
    });
    //this.setState({complete: true});
  }
}




export default Signup;
