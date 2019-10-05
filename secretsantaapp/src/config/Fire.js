import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBP6qhvOa2NZ5Hip9yD3zUAkJryWxLcfTs",
    authDomain: "secretsanta-f3cbd.firebaseapp.com",
    databaseURL: "https://secretsanta-f3cbd.firebaseio.com",
    projectId: "secretsanta-f3cbd",
    storageBucket: "secretsanta-f3cbd.appspot.com",
    messagingSenderId: "1030019629313",
    appId: "1:1030019629313:web:9b396ccd78e27b67a9db00",
    measurementId: "G-BGG66EYEDF"
};

const fire = firebase.initializeApp(config);
export default fire;