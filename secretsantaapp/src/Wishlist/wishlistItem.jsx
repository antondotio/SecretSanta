import React, { Component } from 'react';
import './wishlist.css';
import fire from '../config/Fire';

class WishlistItem extends Component {
  constructor(props){
    super(props);
    this.state ={
      id: props.props.value,
      userEmail:props.props.userEmail,
      name: '',
      link: '',
      price: ''
    }

    this.displayItem = this.displayItem.bind(this);
    this.displayItem();
  }

  displayItem() {
    var docRef = fire.firestore().collection("users").doc(this.state.userEmail).collection("wishlist");
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
        <b><a href={this.state.link} target="_blank">{this.state.name}</a> &emsp;{'$' + this.state.price}</b>
      </div>
    );
  }
}

export default WishlistItem;