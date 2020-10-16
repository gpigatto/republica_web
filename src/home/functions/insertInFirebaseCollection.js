import firebase from '../../core/firebaseConfig';

export function insertInFirebaseCollection (collection, obj) {
  let database = firebase.firestore();
  
  try{
    database.collection(collection).add(obj);
  }
  catch(error) {
    console.error(error);
  }
}