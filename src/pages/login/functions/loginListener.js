import firebase from '../../../core/firebaseConfig';
import routerHistory from '../../../core/routerHistory';
import { insertInFirebaseCollection } from '../../home/functions/insertInFirebaseCollection';

function registerUserInDB(user) {
  insertInFirebaseCollection('users', {
    authorized: false,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid,
  });
}

async function userExistsInDB(user) {
  if (firebase.auth().currentUser) {
    const database = firebase.firestore();

    try {
      const data = await database
        .collection('users')
        .where('uid', '==', user.uid)
        .get();

      if (data.size === 0) {
        registerUserInDB(user);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export function loginListener() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', user.uid);
      }

      userExistsInDB(user);
    } else {
      routerHistory.push('/login');
    }
  });
}
