import React, { Component } from 'react';
import {Popup, CommentAction} from 'semantic-ui-react';
import fire from '../config/Fire';
import User from './groupUser';
import { Link } from "react-router-dom";
import './groups.css';

//Used in line 41 -- Checks if User is null
function isNull(user) {
  return user == null;
}

const style = {
  borderRadius: 0,
  opacity: 1,
  padding: '1em',
}

class Groups extends Component{
  constructor(props) {
    super(props);
    this.state ={
      id: props.groupCode,
      name: '',
      budget: '',
      date: '',
      users: Array(20).fill(null), //Maximum of 20 members per group
      started: null,
      recipient: null,
      username: null,
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.start = this.start.bind(this);
    this.redirectToWishlist = this.redirectToWishlist.bind(this);

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
          date: doc.data().meetingDate,
          started: doc.data().started,
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

  componentDidUpdate(){
    if(this.state.recipient === null) {
      let currentComponent = this;
      let recipient, username;
      var User = fire.auth().currentUser;
      var docRef = fire.firestore().collection("groups").doc(this.state.id).collection("members").doc(User.email);
      docRef.get().then(function(doc) {
        if (doc.exists) {
          recipient = doc.data().recipient;
          username = doc.data().username;
        }
        currentComponent.setState({
          recipient: recipient,
          username: username
        });
      });
    }
  }

  //fills user with username of user
  renderUser(i){
    return(
      <User value={this.state.users[i]}/>
    );
  }

  render() {
    // const alert = useAlert()
    return (
      <div className="Groups">    
        <header className="App-header">
          <div>
            {this.state.name}
          </div>          
          <a className="active" href="/">Home</a>
          <a href="/groups">Groups</a>
          <a href={"/wishlist/" + this.state.username}>Wishlist</a>
        </header> 
        <p className="Info">
          budget: ${this.state.budget} <br/>
          meeting date: {this.state.date} <br></br>
        </p> 
        {this.state.started ? 
          <div>
            <Popup
              trigger={
                // todo fix this 
                <Link to={'/gifteewishlist/' + this.state.recipient} username={this.state.username}> 
                  <button type="button" onClick={this.redirectToWishlist}>View Your Giftee's Wishlist</button>
                </Link>
              }
              content={'your giftee is: '+ this.state.recipient}
              style={style}
            />
            {/* <button type="button" onClick={this.revealRecipient}>Reveal Recipient</button><br></br> */}
          </div> : 
          <div>
            <button type="button" onClick={this.start}>Start</button><br></br>
          </div>
        }
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

  redirectToWishlist(){
    
  }

  start() {
    var numMembers = this.state.users.findIndex(isNull);
    var actualUsers = Array(numMembers);
    
    for (let i = 0; i < numMembers; i++){
      actualUsers[i] = this.state.users[i];
    }
    
    if (numMembers < 3){
      alert('groups must have 3 or more members to start!')
    } else {
      var recipients = actualUsers.slice();
      shuffle(recipients, 0);

      for (let j = 0; j < numMembers; j++){
        if (actualUsers[j] === recipients[j]){
          //if last member's recipient is themself, swap recipients with second last
          if (j === numMembers - 1){
            let temp = recipients[j];
            recipients[j] = recipients[j-1];
            recipients[j-1] = temp;
            //update second last member's recipient 
            fire.firestore().collection("groups").doc(this.state.id).collection("members").where("username", "==", actualUsers[j-1]).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                  saveRecipient(doc.id, recipients[j-1], this.state.id);
                });
            }).catch(function(error) {
              console.log("Error getting documents: ", error);
            });

          } else {
            shuffle(recipients, j);
          }
        } 
        //save to recipient
        fire.firestore().collection("groups").doc(this.state.id).collection("members").where("username", "==", actualUsers[j]).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                saveRecipient(doc.id, recipients[j], this.state.id);
              });
          }).catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      }
      this.setState({started: true});
      fire.firestore().collection("groups").doc(this.state.id).update({
        started: true
      });
    } 
  }
}

function saveRecipient(gifterEmail, recipient, gid) {
  fire.firestore().collection("groups").doc(gid).collection("members").doc(gifterEmail).update({
    recipient: recipient
  });
}

//Fisher-Yates (Knuth) Shuffle
function shuffle(array, startIndex) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (startIndex !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

export default Groups;