import firebase from '../../core/firebaseConfig';

export async function getUserInformation() {
  let database = firebase.firestore();
  let _userUid = localStorage.getItem('currentUser');

  try {
    let data = await database.collection('users').where('uid', '==', _userUid).get();
    let userInformation = data.docs[0].data();
    
    return userInformation;
  }
  catch(error) {
    console.error(error);
  }
}