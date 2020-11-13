import firebase from '../../../core/firebaseConfig';

export async function firebaseCollectionListener(collection, callback) {
  const database = firebase.firestore();

  try {
    database.collection(collection).onSnapshot((data) => callback(data));
  } catch (error) {
    console.error(error);
  }
}
