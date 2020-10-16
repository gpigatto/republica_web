import firebase from '../../core/firebaseConfig';

export async function getUserList() {
  let database = firebase.firestore();

  try {
    let data = await database.collection('users').where('authorized', '==', true).get();
    let userList = data.docs.map(doc => doc.data());

    return userList;
  }
  catch(error) {
    console.error(error);
  }
}