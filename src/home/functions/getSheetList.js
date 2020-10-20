import firebase from '../../core/firebaseConfig';

export async function getSheetList() {
  const database = firebase.firestore();

  try {
    const data = await database.collection('sheet').where('closed', '==', false).get();
    const collectionList = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    return collectionList;
  } catch (error) {
    console.error(error);
    return null;
  }
}
