import React from 'react';
import './wishlist.css';


const Wishlist = () => {
  return (
    <div className="Wishlist">
        
        <header className="App-header">
            <p>
            Secret Santa
            </p>
            <a href="/home">Home</a>
            <a href="/groups">Groups</a>
            <a class="active" href="/wishlist">Wishlist</a><br></br>
            
        </header>
        
    </div>
  );
}

export default Wishlist;