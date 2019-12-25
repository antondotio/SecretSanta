import React, { Component } from 'react';
import './wishlist.css';
import fire from '../config/Fire';
import Items from './wishlistItem'

class RecipientWishlist extends Component {
	constructor(props){
		super(props);
		this.state = {
			new: true,
			wishes: Array(0).fill(0),
      wishesId: Array(0).fill(0),
      username: props.username,
      recipientEmail: null,
		}

    
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
	}

	componentDidMount(){
    fire.firestore().collection("users").where("username", "==", this.props.userId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({
          recipientEmail: doc.id
        });
      });
    });
    this.forceUpdate();
  }

  componentDidUpdate(){
    if(this.state.new && this.state.recipientEmail !== null){
      var docRef = fire.firestore().collection("users").doc(this.state.recipientEmail).collection("wishlist");
      docRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var wishes = this.state.wishes.slice(); 
          var wishesId = this.state.wishesId.slice();
          wishes.push(doc.data().name); //fills array
          wishesId.push(doc.data().id);
          this.setState({
            wishes: wishes,
            wishesId: wishesId
          });
        });
      });
      this.setState({
        new: false
      });
    }
  }
	
	render() {
    return (
      <div className="Wishlist">
        <header className="App-header">
            <p>
            Secret Santa
            </p>
            <a href="/home">Home</a>
            <a href="/groups">Groups</a>
            <a className="active" href={"/wishlist/" + this.state.username}>Wishlist</a>
            <button type="button" onClick={this.logout}>Logout</button><br></br>
        </header>
        <h3 className="Subheader">{ this.props.userId + '\'s Wishlist'}</h3>
				
				{this.state.wishesId.map((i) =>{
          let props = {value: i, userEmail: this.state.recipientEmail}
          return(
            <h2><Items props={props}></Items></h2>
          );
        })}
      </div>
    );
  }
  
  logout(){
    fire.auth().signOut();
  }
}

export default RecipientWishlist;