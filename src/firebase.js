import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";

import "firebase/auth";

const db = firebase.firestore;
const auth = firebase.auth;

const provider = new firebase.auth.GoogleAuthProvider();

const config = {
  apiKey: "AIzaSyCZ5u2IyfC4N_amuvfyjuA2ALXmBUCbIPU",
  authDomain: "chat-hooks-react.firebaseapp.com",
  databaseURL: "https://chat-hooks-react.firebaseio.com",
  projectId: "chat-hooks-react",
  storageBucket: "chat-hooks-react.appspot.com",
  messagingSenderId: "492647945155"
};
firebase.initializeApp(config);

function observeUserConnection() {
  const uid = firebase.auth().currentUser.uid;

  // Create a reference to this user's specific status node.
  // This is where we will store data about being online/offline.

  // We'll create two constants which we will write to
  // the Realtime database when this device is offline
  // or online.
  const isOfflineForDatabase = {
    state: "offline",
    last_changed: firebase.database.ServerValue.TIMESTAMP
  };

  const isOnlineForDatabase = {
    state: "online",
    last_changed: firebase.database.ServerValue.TIMESTAMP
  };

  const userStatusDatabaseRef = firebase.database().ref("/status/" + uid);
  const userStatusFirestoreRef = firebase.firestore().doc("users/" + uid);

  // Firestore uses a different server timestamp value, so we'll
  // create two more constants for Firestore state.
  const isOfflineForFirestore = {
    state: "offline",
    last_changed: firebase.firestore.FieldValue.serverTimestamp()
  };

  const isOnlineForFirestore = {
    state: "online",
    last_changed: firebase.firestore.FieldValue.serverTimestamp()
  };

  firebase
    .database()
    .ref(".info/connected")
    .on("value", function(snapshot) {
      if (snapshot.val() == false) {
        // Instead of simply returning, we'll also set Firestore's state
        // to 'offline'. This ensures that our Firestore cache is aware
        // of the switch to 'offline.'
        userStatusFirestoreRef.update({
          connection: isOfflineForFirestore
        });

        return;
      }

      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(function() {
          userStatusDatabaseRef.set(isOnlineForDatabase);

          // We'll also add Firestore set here for when we come online.
          userStatusFirestoreRef.update({
            connection: isOnlineForFirestore
          });
        })
        .catch(e => console.log(e));
    });
}

export { db, auth, provider, observeUserConnection };
export default firebase;
