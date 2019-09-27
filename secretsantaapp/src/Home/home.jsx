import React, { Component } from 'react';
import './home.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import Groups from '../Groups/groups';
import CreateGroup from '../Groups/creategroup';
import Wishlist from '../Wishlist/wishlist';
import fire from '../config/Fire';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      groupCode: '',
    };

    this.handleGcodeChange = this.handleGcodeChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleGcodeChange(event){
    this.setState({groupCode: event.target.value});
  }

  render(){
    return (
      <div className="Home">
        <div>
         {/* <Router>
              <Route exact path="/groups" component={Groups}/>
              <Route exact path="/groups/:groupCode" component={Groups}/>
              <Route exact path="/creategroup" component={CreateGroup}/>
              <Route exact path="/wishlist" component={Wishlist}/>
          </Router> */}
        </div> 
          <header className="App-header">
              <p>
              Secret Santa
              </p>
              <a class="active" href="/">Home</a>
              <a href="/groups">Groups</a>
              <a href="/wishlist">Wishlist</a>
              <button type="button" onClick={this.logout}>Logout</button><br></br>
              <p className="App-subheader">
              Join group
              </p>
          </header>
          <form>
            <input type="text" placeholder="Group Code" value={this.state.groupCode} onChange={this.handleGcodeChange}></input><br></br>
            
                <button type="button" onClick={() => this.joinGroup()}>Join Group</button><br></br>
            
                <button type="button" onClick={this.createGroup}>Create Group</button><br></br>
            
            
          </form>
      </div>
    );
  }

  joinGroup(event){
    //TODO: Redirect to 404 if page not found
    window.location = '/groups/' + this.state.groupCode;
  }

  createGroup(event){
    event.preventDefault();
    window.location = '/creategroup';

  }

  logout(){
    fire.auth().signOut();
  }
}
export default Home;