import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCeWW8I192pgLzacERdY1QKZvPtKZvtvv4",
    authDomain: "tasks-9672c.firebaseapp.com",
    databaseURL: "https://tasks-9672c.firebaseio.com",
    projectId: "tasks-9672c",
    storageBucket: "tasks-9672c.appspot.com",
    messagingSenderId: "355423170995",
    appId: "1:355423170995:web:9551740c30a6d6fa6d5bc6",
    measurementId: "G-PG4VY34ZDB"
};

const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore()
