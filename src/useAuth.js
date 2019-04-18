import { useReducer, useEffect } from "react";
import { auth, db, observeUserConnection } from "./firebase";
import reducer from "./reducer";
import actions from "./actions";

export default function useAuth() {
  const [{ user, author }, dispatch] = useReducer(reducer, {});
  useEffect(() => {
    return auth().onAuthStateChanged(function(user) {
      if (!user) return dispatch({ type: actions.LOG_OUT });
      const newUser = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        uid: user.uid
      };

      db()
        .collection("users")
        .doc(user.uid)
        .set(newUser, { merge: true });
      observeUserConnection();

      dispatch({ type: actions.LOG_IN, payload: newUser });
    });
  }, []);

  return [user, author, dispatch];
}
