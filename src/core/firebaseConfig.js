import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyB6pv-Ms6dSe-jzWDwMjGnE2HinjvTswv4",
  authDomain: "republica-a360c.firebaseapp.com",
  databaseURL: "https://republica-a360c.firebaseio.com",
  projectId: "republica-a360c",
  storageBucket: "republica-a360c.appspot.com",
  messagingSenderId: "332356986662",
  appId: "1:332356986662:web:4b84e89d94bc225c6043e7",
  measurementId: "G-YGYL4QV8C2"
};

firebase.initializeApp(config);

export default firebase;