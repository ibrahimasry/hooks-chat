import React, { useContext, useEffect } from "react";
import useDocument from "./useDocument";
import { userContext } from "./App";

export default function ChatWithAvatar({ message }) {
  const author = useDocument(`users/${message.user.id}`);
  const { dispatch } = useContext(userContext);
  useEffect(() => dispatch({ type: "currentAuthor", payload: author }), [
    author
  ]);

  return (
    <div className="Message with-avatar">
      <div
        className="Avatar"
        style={{ backgroundImage: author ? `url("${author.photo}")` : "" }}
      />
      <div className="Author">
        <div>
          <span className="UserName">{author.name} </span>
          <span className="TimeStamp">
            {new Date(message.createdAt.seconds * 1000).toLocaleTimeString()}
          </span>
        </div>
        <div className="MessageContent">{message.text}</div>
      </div>
    </div>
  );
}
