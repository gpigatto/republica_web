import firebase from '../../core/firebaseConfig';

export function logout () {
  firebase.auth().signOut();
}