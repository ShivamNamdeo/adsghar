import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';


const app = firebase.initializeApp({
	    apiKey: "AIzaSyCKzzvSIWCv3miDk2UTIreqCImgEhAbf4E",
  authDomain: "ads-ghar.firebaseapp.com",
  projectId: "ads-ghar",
  storageBucket: "ads-ghar.appspot.com",
  messagingSenderId: "272071898039",
  appId: "1:272071898039:web:563e7e08a38408865bae32",
  measurementId: "G-HTR84Y6X4M"
});

export default app;
