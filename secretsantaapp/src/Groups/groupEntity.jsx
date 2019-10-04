import React, { Component } from 'react';
import './groups.css';
import fire from '../config/Fire';

class groupEntity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.value,
      name: '',
    }
    this.displayName = this.displayName.bind(this);
    this.displayName();
  }

  displayName() {
    var docRef = fire.firestore().collection("users").doc(fire.auth().currentUser.email).collection("groupList");
    docRef.where("id", "==", this.state.id).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({
          name: doc.data().name,
        });
      });
    });
  }

  render() {
    return(
      <div className="Info">{this.state.name}</div>
    );
  }
}

export default groupEntity;