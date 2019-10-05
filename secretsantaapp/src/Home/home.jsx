import React, { Component } from 'react';
import './home.css';
//import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
//import 'react-tabs/style/react-tabs.css';
import {Redirect} from 'react-router-dom';

import fire from '../config/Fire';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupCode: '',
      tabIndex: 0,
      joinedGroup: false,
    };

    this.handleGcodeChange = this.handleGcodeChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    //console.log(fire.auth().currentUser);
  }

  handleGcodeChange(event){
    this.setState({groupCode: event.target.value});
  }

  render(){
    return (
      <div className="Home">
        <header className="App-header">
            <p>
            Secret Santa
            </p>
            <a class="active" href="/">Home</a>
            <a href="/grouppage">Groups</a>
            <a href="/wishlist">Wishlist</a>
            <button type="button" onClick={this.logout}>Logout</button>
            <button type="button" onClick={this.check}>check</button><br></br>
        </header>
        <form>
          <p className="App-subheader">
            Join group
          </p>
          <input type="text" placeholder="Group Code" value={this.state.groupCode} onChange={this.handleGcodeChange}></input><br></br>
          <button type="button" onClick={() => this.joinGroup()}>Join Group</button><br></br>
          <button type="button" onClick={this.createGroup}>Create Group</button><br></br>
        </form>
        {this.state.joinedGroup ? <Redirect to={"/groups/" + this.state.groupCode}/> : <p></p>}
      </div>
    );
  }

  joinGroup(event){
    //TODO: Redirect to 404 if page not found
    //TODO: Add checker if user already in group query to find name .where("email",User.email)
    if(this.state.groupCode) {
      var User = fire.auth().currentUser;
      var docRef = fire.firestore().collection("groups").doc(this.state.groupCode);

      //Add New User
      docRef.get().then(() => {
        fire.firestore().collection("groups").doc(this.state.groupCode).collection("members").doc(User.email).set({
          email: User.email,
          username: User.displayName,
        });
      });
        
      //Add group to user data
      docRef.get().then((doc) => {
        if(doc.exists) {
          //Put group in user database
          fire.firestore().collection("users").doc(User.email).collection("groupList").doc(this.state.groupCode).set({
            name: doc.data().groupName,
            admin: false,
            id: this.state.groupCode,
          });
          this.setState({
            joinedGroup: true,
          });
        } else {
          alert("Group does not exist!");
        }
      });
    } else {
      alert("Must enter a group code!");
    }
  }

  createGroup(event){
    event.preventDefault();
    window.location = '/creategroup';

  }

  logout(){
    fire.auth().signOut();
  }

  check() {
    if(fire.auth().currentUser) {
      alert(fire.auth().currentUser.email);
    } else {
      alert("!user");
    }
  }
}
export default Home;