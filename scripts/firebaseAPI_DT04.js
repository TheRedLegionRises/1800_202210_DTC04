// WEBSITE FIREBASE CONFIGUARATION

var firebaseConfig = {
    apiKey: "AIzaSyA2PjrMca1xtoUgRIwecYJ0belddaBPqDI",
    authDomain: "comp-1800-project.firebaseapp.com",
    projectId: "comp-1800-project",
    storageBucket: "comp-1800-project.appspot.com",
    messagingSenderId: "265413959644",
    appId: "1:265413959644:web:baeddd829bf7e3c1e9b919",
    measurementId: "G-39SJ5YFZ6Z"
};

// INITIALIZE FIREBASE APP
const app = firebase.initializeApp(firebaseConfig);

// INITIALIZE FIRESTORE DATABASE
const db = firebase.firestore();