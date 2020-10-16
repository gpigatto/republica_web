import firebase from '../../core/firebaseConfig';

export function deleteInFirebaseCollection(collection, id) {
  let database = firebase.firestore();
  
  try{
    database.collection(collection).doc(id).delete();
  }
  catch(error) {
    console.error(error);
  }
}