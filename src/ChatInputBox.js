import React, { useState, useContext } from "react";
import { db } from "./firebase";
import { userContext } from "./App";

function ChatInputBox({ channelName }) {
  const [message, setMessage] = useState("");
  const { user } = useContext(userContext);

  const sendMessage = async e => {
    if (e.key === "Enter") {
      await db()
        .collection(`channels/${channelName}/messages`)
        .add({
          text: message,
          createdAt: new Date(),
          user: db()
            .collection("users")
            .doc(user.uid)
        });
      setMessage("");
    }
  };
  return (
    <div className="ChatInputBox">
      <input
        onKeyDown={sendMessage}
        onChange={e => {
          setMessage(e.target.value);
        }}
        value={message}
        className="ChatInput"
        placeholder={`Message ${channelName}`}
      />
    </div>
  );
}

export default ChatInputBox;
