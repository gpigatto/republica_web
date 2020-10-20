import firebase from '../../core/firebaseConfig';

export async function firebaseCollectionListener (collection, callback) {
  const database = firebase.firestore();

  try {
    database.collection(collection).onSnapshot(
      function(data) {
        return callback(data);
      }
    );
  }
  catch(error) {
    console.error(error);
  }
}
