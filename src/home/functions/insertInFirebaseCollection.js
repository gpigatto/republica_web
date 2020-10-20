import firebase from '../../core/firebaseConfig';

export function insertInFirebaseCollection (collection, obj) {
  const database = firebase.firestore();

  try{
    database.collection(collection).add(obj);
  }
  catch(error) {
    console.error(error);
  }
}
