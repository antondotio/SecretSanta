import React, { Component } from 'react';
import './wishlist.css';
import fire from '../config/Fire';
// import Home from '../Home/home';
// import CreateGroup from '../Groups/creategroup';
// import Groups from '../Groups/groups';

class Wishlist extends Component {
  render() {
    return (
      <div className="Wishlist">
          
          <header className="App-header">
              <p>
              Secret Santa
              </p>
              <a href="/">Home</a>
              <a href="/grouppage">Groups</a>
              <a class="active" href="/wishlist">Wishlist</a>
              <button type="button" onClick={this.logout}>Logout</button><br></br>
              
          </header>
          
      </div>
    );
  }
  
  logout(){
    fire.auth().signOut();
  }

}

export default Wishlist;