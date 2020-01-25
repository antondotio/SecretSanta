import fire from '../config/Fire';

const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors());

app.get('/startGroup', function (req, res) {
    var groupCode = req.query.groupCode;
    var allUsers;

    docRef.collection("members").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var users = this.state.users.slice(); //copys the array
          var index = users.findIndex(isNull); //finds the next null value in array
          users[index] = doc.data().username; //fills the next null value with the next user
            Allusers = users //saves to state
          });
    });

    var numMembers = allUsers.length;
    var actualUsers = Array(numMembers);
    
    for (let i = 0; i < numMembers; i++){
      actualUsers[i] = this.state.users[i];
    }

    var recipients = actualUsers.slice();
    shuffle(recipients, 0);

    for (let j = 0; j < numMembers; j++){
      if (actualUsers[j] === recipients[j]){
        //if last member's recipient is themself, swap recipients with second last
        if (j === numMembers - 1){
          let temp = recipients[j];
          recipients[j] = recipients[j-1];
          recipients[j-1] = temp;
          //update second last member's recipient 
          fire.firestore().collection("groups").doc(this.state.id).collection("members").where("username", "==", actualUsers[j-1]).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                saveRecipient(doc.id, recipients[j-1], this.state.id);
              });
          }).catch(function(error) {
            console.log("Error getting documents: ", error);
          });

        } else {
          shuffle(recipients, j);
        }
        j--;
      } 
    }
    res.status(200).json({'recipients': recipients});
})

function saveRecipient(gifterEmail, recipient, gid) {
    fire.firestore().collection("groups").doc(gid).collection("members").doc(gifterEmail).update({
      recipient: recipient
    });
  }
  
  //Fisher-Yates (Knuth) Shuffle
  function shuffle(array, startIndex) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (startIndex !== currentIndex) {
      randomIndex = Math.floor(Math.random() * (currentIndex-startIndex)) + startIndex;
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

app.listen(port);