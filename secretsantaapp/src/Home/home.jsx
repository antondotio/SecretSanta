import React from 'react';
import './home.css';


const Home = () => {
  return (
    <div className="Home">
      <header className="App-header">
        <p>
          Secret Santa
        </p>
        <p className="App-subheader">
          Join group
        </p>
      </header>
      <form>
        <input type="text" placeholder="Group Code"></input><br></br>
        <button type="submit">Submit</button><br></br> 
        <button type="button" onClick={() => createGroup()}>Create group</button>
      </form>

      

    </div>
  );
}

function createGroup(){

}

export default Home;