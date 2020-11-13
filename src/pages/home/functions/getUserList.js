import firebase from '../../../core/firebaseConfig';

export async function getUserList() {
  const database = firebase.firestore();

  try {
    const data = await database
      .collection('users')
      .where('authorized', '==', true)
      .get();
    const userList = data.docs.map((doc) => doc.data());

    return userList;
  } catch (error) {
    console.error(error);
    return null;
  }
}
