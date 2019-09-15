import React from 'react';
import './signup.css';

function signup() {
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
        <button type="button">Sign Up</button>
      </form>
     
    </div>
  );
}


// export default App;
