import React, { Component } from 'react';
import './home.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupCode: '',
    };

    this.handleGcodeChange = this.handleGcodeChange.bind(this);
  }

  handleGcodeChange(event){
    this.setState({groupCode: event.target.value});
  }

  render(){
    return (
      <div className="Home">
          
          <header className="App-header">
              <p>
              Secret Santa
              </p>
              <a class="active" href="/home">Home</a>
              <a href="/groups">Groups</a>
              <a href="/wishlist">Wishlist</a><br></br>
              <p className="App-subheader">
              Join group
              </p>
          </header>
          <form>
            <input type="text" placeholder="Group Code" value={this.state.groupCode} onChange={this.handleGcodeChange}></input><br></br>
            <Link to = {'/groups/:groupCode'} >
              <button type="button" onClick={() => this.joinGroup()}>Join Group</button><br></br>
            </Link> 
            <Link to = {'/creategroup'} >
              <button type="button" onClick={() => this.createGroup()}>Create Group</button><br></br>
            </Link> 
          </form>
      </div>
    );
  }

  joinGroup(){

  }

  createGroup(){

  }
}
export default Home;