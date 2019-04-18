import React, { useEffect, useContext } from "react";

import Members from "./Members";
import ChannelInfo from "./ChannelInfo";
import Messages from "./Messages";
import ChatInputBox from "./ChatInputBox";
import { db } from "./firebase";

import { userContext } from "./App";
function Channel({ channelName }) {
  const {
    user: { uid }
  } = useContext(userContext);
  useEffect(() => {
    db()
      .doc(`users/${uid}`)
      .update({ [`channels.${channelName}`]: true });
  }, [channelName, uid]);
  return (
    <div className="Channel">
      <div className="ChannelMain">
        <ChannelInfo channelName={channelName} />
        <Messages channelName={channelName} />
        <ChatInputBox channelName={channelName} />
      </div>
      <Members channelName={channelName} />
    </div>
  );
}

export default Channel;
