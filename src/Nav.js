import React, { useState, useEffect, useContext } from "react";
import { db, auth } from "./firebase";
import { Link } from "@reach/router";
import { userContext } from "./App";

function Nav() {
  const [channels, setChannels] = useState([]);
  const { user } = useContext(userContext);
  useEffect(() => {
    return db()
      .collection("channels")
      .onSnapshot(snapshot => {
        const docs = [];
        snapshot.forEach(doc => {
          docs.push({
            ...doc.data(),
            id: doc.id
          });
        });
        setChannels(docs);
      });
  }, []);

  const handleLogout = e => {
    auth()
      .signOut()
      .then(d => console.log(d));
  };
  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src={user && user.photo} />
        <div>
          <div>{user && user.name}</div>
          <div>
            <button className="text-button" onClick={handleLogout}>
              log out
            </button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <Link key={channel.id} to={`/channel/${channel.id}`}>
            # {channel.id}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Nav;
