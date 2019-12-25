import React, { Component } from 'react';
import fire from '../config/Fire';
import './groups.css';
import Groups from './groupEntity';

class groupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new: true, //boolean if the page just opened or not
      groups: Array(0).fill(0), //An array of the id of all group names the user is participating in
      groupId: Array(0).fill(0), //An array of the id of all group Id's the user is participating in
      username: null,
    }
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.findPage = this.findPage.bind(this);
  }

  componentDidUpdate() {
    if (this.state.username === null){
      var User = fire.auth().currentUser;
      if(this.state.new) {
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
        this.setState({new: false});
      }
      fire.firestore().collection("users").doc(User.email).get().then((doc) =>{
        if(doc.exists){
          this.setState({
            username: doc.data().username
          });
        }
      })
    }
  }

  render() {
    return (
      <div className="Groups">
          <header className="App-header">
              <p>
              Secret Santa
              </p>
              <a href="/">Home</a>
              <a href="/groups">Groups</a>
              <a className="active" href={"/wishlist/" + this.state.username}>Wishlist</a>
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
                <Groups value={i}/>
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