import firebase from '../../../core/firebaseConfig';

export async function getFirebaseCollection(collection) {
  const database = firebase.firestore();
  try {
    const data = await database.collection(collection).get();
    const collectionList = data.docs.map((doc) => doc.data());

    return collectionList;
  } catch (error) {
    console.error(error);
    return null;
  }
}
