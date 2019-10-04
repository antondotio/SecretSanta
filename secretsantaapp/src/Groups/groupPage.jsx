import React, { Component } from 'react';
import fire from '../config/Fire';
import './groups.css';
import Group from './groupEntity';

class groupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new: true,
      groups: Array(0).fill(0),
      groupId: Array(0).fill(0),
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
          var groups = this.state.groups.slice();
          var groupId = this.state.groupId.slice();
          groups.push(doc.data().name);
          groupId.push(doc.data().id);
          this.setState({
            groups: groups,
            groupId: groupId,
          });
        });
      });
      this.setState({new: false});
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

  findPage(i) {
    return("/groups/" + i);
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

export default groupPage;