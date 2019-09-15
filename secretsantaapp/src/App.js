import React from 'react';
import './App.css';

function App() { 
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
          <input type="text" placeholder="email or username"></input><br/>
          <input type="password" placeholder="password"></input><br/>
          <button type="submit">Submit</button><br/> 
          <button type="button" onClick={() => signUp()}>Sign Up</button>
        </form>
        <Router>
          <Switch>
            <Route exact path="/" component={Login}/>
          </Switch>
        </Router>
      </div>
    );
}

function signUp() {
  alert('click')
}

export default App;
