import React from 'react';
import './login.css';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
  } from "react-router-dom";

const Login = () => {
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
        <input type="text" placeholder="Email or Username"></input><br></br>
        <input type="password" placeholder="Password"></input><br></br>
        <button type="submit">Submit</button><br></br> 
        <Link to="/signup">
            <button type="button">Sign Up</button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
