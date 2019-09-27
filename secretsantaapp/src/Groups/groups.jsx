import React, { Component } from 'react';
import './groups.css';
import fire from '../config/Fire';


function logout(){
  //fire.auth().signOut();
}

const Groups = ({match}) => {
  // var docRef = fire.firestore().collection("groups").doc(match.params.groupCode);
  // var id, name, budget;
  // docRef.get().then(function(doc) {
  //   if(doc.exists) {
  //     id = doc.groupCode;
  //   }
  // });

  return (
      <div className="Groups">
          
          <header className="App-header">
              <p>
              Secret Santa
              </p>
              <a href="/">Home</a>
              <a class="active" href="/groups">Groups</a>
              <a href="/wishlist">Wishlist</a>
              {/* <button type="button" onClick={logout()}>Logout</button><br></br>            */}
          </header>      
        </div>
      );
  }


export default Groups;