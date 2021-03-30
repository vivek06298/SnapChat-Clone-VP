import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBZLGOLtMnmdn0WfQgJVObhcW0fz09AsUo",
    authDomain: "snapchat-clone-vp.firebaseapp.com",
    projectId: "snapchat-clone-vp",
    storageBucket: "snapchat-clone-vp.appspot.com",
    messagingSenderId: "407913618175",
    appId: "1:407913618175:web:9e4107303a1de75963caca",
    measurementId: "G-VYW0MZXE6Z"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db  = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider =  new firebase.auth.GoogleAuthProvider();

export {db,auth,storage,provider};