import React, { Component } from 'react';
import fire from '../config/Fire';
import './creategroup.css';
// import { FORMERR } from 'dns';
import {
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
            created: false,
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
        if(this.state.created) {
            return(
                <Redirect to={"/groups/" + this.state.id}></Redirect>
            );
        }
        return(
            <div className="CreateGroup">
                <header className="App-header">
                    <p>
                        Secret Santa
                    </p>
                    <a href="/">Home</a>
                    <a class="active" href="/grouppage">Groups</a>
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
        if(!this.state.groupName || !this.state.budget || !this.state.id){
            alert("must fill in all text fields");
        } else {
            this.saveNewGroup();
            this.setState({created: true});
        }
    }

    saveNewGroup(){
        var data = {
            id: this.state.id,
            groupName: this.state.groupName,
            budget: this.state.budget,
        };
        //Create new Group in database
        fire.firestore().collection("groups").doc(this.state.id).set(data).then(function() {
            //alert("works");
        });

        //Add user to group data
        var User = fire.auth().currentUser;
        fire.firestore().collection("groups").doc(this.state.id).collection("members").doc(User.email).set({
          email: User.email,
          username: User.displayName,
        });

        //Add group to user data
        fire.firestore().collection("users").doc(User.email).collection("groupList").doc(this.state.id).set({
            name: this.state.groupName,
            admin: true,
            id: this.state.id,
        });
        // window.location = "/groups/" + this.state.id;
    }
        
}

export default CreateGroup;