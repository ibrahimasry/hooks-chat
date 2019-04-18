import React from "react";
import useCollection from "./useCollection";
function Members({ channelName }) {
  const users = useCollection(`users`, undefined, [
    `channels.${channelName}`,
    "==",
    true
  ]);
  return (
    <div className="Members">
      <div>
        {users.map(user => {
          return (
            <div key={user.id} className="Member">
              <div
                className={`MemberStatus ${
                  user.connection.state === "online" ? "online" : "offline"
                }`}
              />
              {user.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Members;
