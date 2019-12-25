import React, { Component } from 'react';
import './wishlist.css';
import fire from '../config/Fire';
import Items from './wishlistItem'

class WishlistPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			new: true,
			wishes: Array(0).fill(0),
      wishesId: Array(0).fill(0),
      username: props.userId,
		}

    this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.addToList = this.addToList.bind(this);
	}

	componentDidUpdate(){
    var User = fire.auth().currentUser;
    if(this.state.new){
      var docRef = fire.firestore().collection("users").doc(User.email).collection("wishlist");
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
        <h3 class="Subheader">Your Wishlist</h3>
				<form>
					<button type="button" onClick={this.addToList}>Add Item to Wishlist</button><br></br>
          <a>&emsp;</a>
				</form>
				{this.state.wishesId.map((i) =>{
          let props = {value: i, userEmail: this.props.user.email}
          return(
            <h2><Items props={props} ></Items></h2>
          );
        })}
      </div>
    );
	}

	addToList(event){
		event.preventDefault();
    window.location = '/wishlist/' + this.state.username + '/add';
  }

  logout(){
    fire.auth().signOut();
  }
}

export default WishlistPage;