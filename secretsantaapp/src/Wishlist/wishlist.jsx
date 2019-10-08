import React, { Component } from 'react';
import './wishlist.css';
import fire from '../config/Fire';
import Items from './wishlistItem'
// import Home from '../Home/home';
// import CreateGroup from '../Groups/creategroup';
// import Groups from '../Groups/groups';
var shortid = require("shortid");

class Wishlist extends Component {
  constructor(props) { 
    super(props);

    this.state = {
      id: shortid.generate(),
      name: '',
      link: '',
      price: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  handleNameChange(event){
    this.setState({ name: event.target.value });
  }
  handleLinkChange(event){
    this.setState({ link: event.target.value });
  }
  handlePriceChange(event){
    this.setState({ price: event.target.value });
  }

  componentDidMount(){
    var docRef = fire.firestore().collection("users").doc("anton.jaime15@gmail.com").collection("wishlist").doc(this.state.id);
    docRef.get().then((doc) => {
      if(doc.exists){
        this.setState({
          name: doc.data().name
        });
      }
    });
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
        <form id="myForm">
          <input type="text" placeholder="Item Name" value={this.state.name} onChange={this.handleNameChange}></input>
          <input type="text" placeholder="Item Link" value={this.state.link} onChange={this.handleLinkChange}></input>
          <input type="number" placeholder="Price" value={this.state.price} onChange={this.handlePriceChange}></input><br></br>
          <button type="button" onClick={() => this.addItem()}>Add item</button><br></br>
        </form>
      </div>
    );

  }

  addItem(){

    if(!this.state.name || !this.state.link || !this.state.price){
      alert("must fill in all fields!");
    } else {
      this.saveItem();
      this.setState({
        id: shortid.generate(),
        name: '',
        link: '',
        price: '',
      });
      this.forceUpdate();
    }
  }

  saveItem(){
    var User = fire.auth().currentUser;
    fire.firestore().collection("users").doc(User.email).collection("wishlist").doc(this.state.id).set({
      name: this.state.name,
      link: this.state.link,
      price: this.state.price,
      id: this.state.id,
      admin: true
    });
    
  }

  logout(){
    fire.auth().signOut();
  }

}

export default Wishlist;