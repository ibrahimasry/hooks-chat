import React from "react";
import { auth, provider } from "./firebase";
import { Redirect } from "@reach/router";
import actions from "./actions";
const handleLogin = dispatch => {
  auth()
    .signInWithPopup(provider)
    .then(() => dispatch({ type: actions.LOG_IN }))
    .catch(error => console.log(error));
};
export default ({ dispatch, user }) => {
  if (user) return <Redirect to="channel/general" />;
  else {
    return (
      <div className="Login">
        <button onClick={() => handleLogin()}>click here to log in :)</button>
      </div>
    );
  }
};
