import React from 'react';
import './groups.css';


const Groups = () => {
  return (
    <div className="Groups">
        
        <header className="App-header">
            <p>
            Secret Santa
            </p>
            <a href="/home">Home</a>
            <a class="active" href="/groups">Groups</a>
            <a href="/wishlist">Wishlist</a><br></br>
            
        </header>
        
    </div>
  );
}

export default Groups;