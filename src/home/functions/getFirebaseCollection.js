import firebase from '../../core/firebaseConfig';

export function getFirebaseCollection (collection) {
  let database = firebase.firestore();

  try{
    let data = await database.collection(collection).get();
    let collectionList = data.docs.map(doc => doc.data());

    return collectionList;
  }
  catch(error) {
    console.error(error);
  }
}