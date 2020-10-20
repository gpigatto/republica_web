import firebase from '../../core/firebaseConfig';

export async function getUserInformation() {
  const database = firebase.firestore();
  const _userUid = localStorage.getItem('currentUser');

  try {
    const data = await database.collection('users').where('uid', '==', _userUid).get();
    const userInformation = data.docs[0].data();

    return userInformation;
  } catch (error) {
    console.error(error);
    return null;
  }
}
