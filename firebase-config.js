const firebase = require("firebase/app");
require("firebase/firestore");
require("firebase/auth");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2aVMB_1va47rJCf2F_5sa6J2FeJsJ5Es",
  authDomain: "projet-stripe.firebaseapp.com",
  projectId: "projet-stripe",
  storageBucket: "projet-stripe.appspot.com",
  messagingSenderId: "887915537184",
  appId: "1:887915537184:web:7b18067a45999adbd62d45",
  measurementId: "G-E37Z6BJEVW",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

module.exports = { db, auth, timestamp };
