import React, { Component } from 'react';
import './wishlist.css';
import fire from '../config/Fire';

class WishlistItem extends Component {
  constructor(props){
    super(props);
    this.state ={
      id: props.value,
      name: '',
      link: '',
      price: ''
    }

    this.displayItem = this.displayItem.bind(this);
    this.displayItem();
  }
  
  displayItem() {
    var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.email).collection("wishlist");
    docRef.where("id", "==", this.state.id).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({
          name: doc.data().name,
          link: doc.data().link,
          price: doc.data().price
        });
      });
    });
  }
   
  render() {
    return (
      <div className="Item" >
        <a href={this.state.link} target="_blank">{this.state.name}</a>
        <a> &emsp;{'$' + this.state.price}</a>
      </div>
    );
  }
}

export default WishlistItem;