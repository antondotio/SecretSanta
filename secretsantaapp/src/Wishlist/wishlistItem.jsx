import React, { Component } from 'react';
import './wishlist.css';
import fire from '../config/Fire';

class wishlistItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: fire.auth().currentUser,
      name: '',
      link: '',
      price: '',
    }
  }

  displayItem(){

  }

  render(){
    return(
      <div className="Item">{this.state.name}</div>
    );
  }
}

export default wishlistItem;