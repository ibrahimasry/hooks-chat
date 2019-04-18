import React from "react";
import { Router } from "@reach/router";
import Login from "./Login";

import Nav from "./Nav";
import Channel from "./Channel";
import useAuth from "./useAuth";

export const userContext = React.createContext();
function App() {
  const [user, author, dispatch] = useAuth();
  if (!user) return <Login dispatch={dispatch} user={user} />;

  return (
    <div className="App">
      <userContext.Provider value={{ user, author, dispatch }}>
        <Nav />
        <Router>
          <Channel path="channel/:channelName" />
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;
