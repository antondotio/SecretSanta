import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAWXGk6i4BBG7DWNthbqj23P80Q8kP0i_4",
    authDomain: "secretsanta-1cd15.firebaseapp.com",
    databaseURL: "https://secretsanta-1cd15.firebaseio.com",
    projectId: "secretsanta-1cd15",
    storageBucket: "",
    messagingSenderId: "885828088715",
    appId: "1:885828088715:web:8a73b87539d479991db58e"
};

const fire = firebase.initializeApp(config);
export default fire;