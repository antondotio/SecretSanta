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
		}

    this.componentDidUpdate = this.componentDidUpdate.bind(this);
		this.addToList = this.addToList.bind(this);
	}

	componentDidUpdate(){
		if(this.state.new){
			var User = fire.auth().currentUser;
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
			this.setState({ new: false });
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
            <button type="button" onClick={this.logout}>Logout</button><br></br>
        </header>
        <h3 class="Subheader">Wishlist</h3>
				<form>
					<button type="button" onClick={this.addToList}>Add to List</button><br></br>
				</form>
				{this.state.wishesId.map((i) =>{
          return(
            <h2><Items value={i}></Items></h2>
          );
        })}
      </div>
    );
	}

	addToList(event){
		event.preventDefault();
    window.location = '/wishlistadd';
	}
}

export default WishlistPage;