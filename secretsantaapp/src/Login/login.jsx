import React from 'react';
import './login.css';
import Signup from '../Signup/signup';

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
        <input type="text" placeholder="email or username"></input><br></br>
        <input type="password" placeholder="password"></input><br></br>
        <button type="submit">Submit</button><br></br> 
        <button type="button" onClick={() => signUp()}>Sign Up</button>
      </form>
    </div>
  );
}

function signUp() {
    
}


export default Login;
