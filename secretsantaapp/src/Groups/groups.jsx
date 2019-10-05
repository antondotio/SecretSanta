import React, { Component } from 'react';
import './groups.css';
import fire from '../config/Fire';
import User from './groupUser';

//Used in line 41 -- Checks if User is null
function isNull(user) {
  return user == null;
}

class Groups extends Component{
  constructor(props) {
    super(props);
    this.state ={
      id: props.groupCode,
      name: '',
      budget: '',
      users: Array(20).fill(null), //Maximum of 20 members per group
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.start = this.start.bind(this);
  }

  //componentDidMount runs at the start of every program
  componentDidMount() {
    //query the page data (name an budget)
    var docRef = fire.firestore().collection("groups").doc(this.state.id);
    docRef.get().then((doc) => {
      if(doc.exists) {
        this.setState({
          name: doc.data().groupName,
          budget: doc.data().budget,
        });
      }
    });

    //query the list of users and stores them in users array in state
    docRef.collection("members").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var users = this.state.users.slice(); //copys the array
        var index = users.findIndex(isNull); //finds the next null value in array
        users[index] = doc.data().username; //fills the next null value with the next user
        this.setState({
          users: users //saves to state
        });
      });
    });
  }

  //fills user with username of user
  renderUser(i){
    return(
      <User value={this.state.users[i]}/>
    );
  }

  render() {
    return (
      <div className="Groups">    
        <header className="App-header">
          <div>
            {this.state.name}
          </div>          
          <a class="active" href="/">Home</a>
          <a href="/grouppage">Groups</a>
          <a href="/wishlist">Wishlist</a>
        </header> 
        <p className="Info">
          budget: ${this.state.budget} <br/>
          <button type="button" onClick={this.start}>Start</button><br></br>
        </p> 
        <div className="Member">
          Members:  
        </div>  
        <div className="Table">
            <li>{this.renderUser(0)}</li>
            <li>{this.renderUser(1)}</li>
            <li>{this.renderUser(2)}</li>
            <li>{this.renderUser(3)}</li>
            <li>{this.renderUser(4)}</li>
        </div>
        <div className="Table">
            <li>{this.renderUser(5)}</li>
            <li>{this.renderUser(6)}</li>
            <li>{this.renderUser(7)}</li>
            <li>{this.renderUser(8)}</li>
            <li>{this.renderUser(9)}</li>
        </div>
        <div className="Table">
            <li>{this.renderUser(10)}</li>
            <li>{this.renderUser(11)}</li>
            <li>{this.renderUser(12)}</li>
            <li>{this.renderUser(13)}</li>
            <li>{this.renderUser(14)}</li>
        </div>
        <div className="Table">
            <li>{this.renderUser(15)}</li>
            <li>{this.renderUser(16)}</li>
            <li>{this.renderUser(17)}</li>
            <li>{this.renderUser(18)}</li>
            <li>{this.renderUser(19)}</li>
        </div>
         
      </div>
    );
  }

  //checks to see if there is an even amount of users then randomly pairs them (Not done yet)
  start() {
    console.log(this.state.users);
    if(fire.auth().currentUser) {
      //alert(fire.auth().currentUser.email);
    } else {
      alert("!user");
    }
  }

}


export default Groups;