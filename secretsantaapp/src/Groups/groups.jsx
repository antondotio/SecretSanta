import React, { Component } from 'react';
import './groups.css';
import fire from '../config/Fire';


class Groups extends Component {
  render () {
    return (
        <div className="Groups">
            
            <header className="App-header">
                <p>
                Secret Santa
                </p>
                <a href="/home">Home</a>
                <a class="active" href="/groups">Groups</a>
                <a href="/wishlist">Wishlist</a>
                <button type="button" onClick={this.logout}>Logout</button><br></br>
                
            </header>
            
        </div>
      );
  }

  logout(){
    fire.auth().signOut();
  }

}

export default Groups;