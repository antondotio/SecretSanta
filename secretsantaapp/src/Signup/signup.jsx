import React from 'react';
import './signup.css';

const Signup = () => {
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
      <form action="localhost:3000/signup">
        <input type="text" placeholder="First Name"></input>
        <input type="text" placeholder="Last Name"></input><br></br>
        <input type="text" placeholder="Email"></input><br></br>
        <input type="text" placeholder="Username"></input><br></br>
        <input type="password" placeholder="Password"></input><br></br>
        <input type="password" placeholder="Confirm Password"></input><br></br>
        <button type="submit">Sign Up</button><br></br> 
      </form>
    </div>
  );
}

export default Signup;
