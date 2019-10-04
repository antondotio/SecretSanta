import React, { Component } from 'react';
import fire from '../config/Fire';
import './groups.css';
import Group from './groupEntity';

class groupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new: true, //boolean if the page just opened or not
      groups: Array(0).fill(0), //An array of the id of all group names the user is participating in
      groupId: Array(0).fill(0), //An array of the id of all group Id's the user is participating in
    }
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.findPage = this.findPage.bind(this);
  }

  componentDidUpdate() {
    if(this.state.new) {
      var User = fire.auth().currentUser;
      var docRef = fire.firestore().collection("users").doc(User.email).collection("groupList");
      docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var groups = this.state.groups.slice(); //copies group name array
          var groupId = this.state.groupId.slice(); //compies group id array
          groups.push(doc.data().name); //fills array
          groupId.push(doc.data().id); //fills array
          this.setState({
            groups: groups, //saves state
            groupId: groupId, //saves state
          });
        });
      });
      this.setState({new: false}); //must turn new to false or this will run infinitely
    }
  }


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
                <button type="button" onClick={this.logout}>Logout</button>
                {/* <button type="button" onClick={this.check}>check</button><br></br> */}
            </header>
            <div className="Member">
              Groups: 
            </div>  
            {/* basically a loop that creates an entity of Group for each item in the array */}
            {this.state.groupId.map((i) =>{
              return (
                <a href={this.findPage(i)}>
                  <Group value={i}/>
                </a>
              );
            })}
        </div>
      );
 }

  //used for line 58 -- returns the link of each group
  findPage(i) {
    return("/groups/" + i);
  }
      
  logout(){
    fire.auth().signOut();
  }

  //checks if user is signed in, only used to debugging
  check() {
    if(fire.auth().currentUser) {
      alert(fire.auth().currentUser.email);
    } else {
      alert("!user");
    }
  }

 }

export default groupPage;