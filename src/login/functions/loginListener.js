import firebase from '../../core/firebaseConfig';
import routerHistory from '../../core/routerHistory';
import { insertInFirebaseCollection } from '../../home/functions/insertInFirebaseCollection';

export function loginListener () {
  firebase.auth().onAuthStateChanged(
    (user) => {
      if(user) {
        if (!localStorage.getItem('currentUser'))
        localStorage.setItem('currentUser', user.uid);

        userExistsInDB(user);

        routerHistory.push("/");
      }
      else {
        routerHistory.push("/login");
      }
    }
  );
}

async function userExistsInDB(user) {
  if (firebase.auth().currentUser) {
    let database = firebase.firestore();

    try {
      let data = await database.collection('users').where('uid', '==', user.uid).get();

      if (data.size === 0) {
        registerUserInDB(user);
      } 
    } catch(error) {
      console.error(error);
    }
  }
}

function registerUserInDB(user) {
  insertInFirebaseCollection(
    'users', 
    {
      authorized: false,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
    }
  );
}