import React, { Component } from 'react';
import fire from '../config/Fire';
import './creategroup.css';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
  } from "react-router-dom";

var shortid = require("shortid");

class CreateGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: shortid.generate(),
            groupName: '',
            budget: '',
        };
        
        this.handleGnameChange = this.handleGnameChange.bind(this);
        this.handleBudgetChange = this.handleBudgetChange.bind(this);
    }

    handleGnameChange(event){
        this.setState({groupName: event.target.value});
    }

    handleBudgetChange(event){
        this.setState({budget: event.target.value});
    }

    render() {
        return(
            <div className="CreateGroup">
                <header className="App-header">
                    <p>
                        Secret Santa
                    </p>
                    <a href="/home">Home</a>
                    <a class="active" href="/groups">Groups</a>
                    <a href="/wishlist">Wishlist</a><br></br>
                </header>
                
                <p className="Subheader">
                    Group Code: {this.state.id} 
                </p>


                <form>
                    <input type="text" placeholder="Group Name" value={this.state.groupName} onChange={this.handleGnameChange}></input><br></br>
                    <input type="number" placeholder="Budget" value={this.state.budget} onChange={this.handleBudgetChange}></input><br></br>
                    <button type="button" onClick={() => this.createGroup()}>Create Group</button><br></br>
                </form>
            
            </div>
        );
    }

    createGroup(){
        if(!this.state.groupName || !this.state.budget){
            alert("must fill in all text fields");
        } else {
            fire.firestore().collection("groups").add({
                id: this.state.id,
                groupName: this.state.groupName,
                budget: this.state.budget,
            });
            window.location = '/groups/' + this.state.id;
        }
    }
}

export default CreateGroup;