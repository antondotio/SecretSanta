import React, { Component } from 'react';
import './groups.css';
import fire from '../config/Fire';
import User from './groupUser';

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
      users: Array(20).fill(null),
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.start = this.start.bind(this);
  }

  componentDidMount() {
    //query data
    var docRef = fire.firestore().collection("groups").doc(this.state.id);
    docRef.get().then((doc) => {
      if(doc.exists) {
        this.setState({
          name: doc.data().groupName,
          budget: doc.data().budget,
        });
      }
    });

    //query users
    docRef.collection("members").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var users = this.state.users.slice();
        var index = users.findIndex(isNull);
        users[index] = doc.data().username;
        this.setState({
          users: users
        });
      });
    });
  }

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