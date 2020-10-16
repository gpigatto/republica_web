import firebase from '../../core/firebaseConfig';

export async function getSheetList() {
  let database = firebase.firestore();

  try {
    let data = await database.collection('sheet').where('closed', '==', false).get();
    let collectionList = data.docs.map(doc => ({...doc.data(), id: doc.id}));
    
    return collectionList;
  }
  catch(error) {
    console.error(error);
  }
}