import React, { useContext, useState } from "react";
import { userContext } from "./App";
export default function ChatWithAvatar({ message }) {
  const { author } = useContext(userContext);
  const [display, setOpacity] = useState("none");
  return (
    <div className="Message ">
      <div className="Author">
        <div
          onMouseDown={() => setOpacity("block")}
          onMouseLeave={() => setOpacity("none")}
          className="MessageContent"
        >
          {message.text}
        </div>

        <div
          style={{
            display: "flex",
            alignContent: "center",

            fontSize: "14px"
          }}
        >
          <span
            className="UserName"
            style={{
              display
            }}
          >
            {author && author.name}{" "}
          </span>

          <span
            style={{
              display
            }}
            className="TimeStamp"
          >
            {new Date(message.createdAt.seconds * 1000).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
