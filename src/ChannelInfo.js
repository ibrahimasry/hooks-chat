import React from "react";

function ChannelInfo({ channelName }) {
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic:{" "}
        <input
          className="TopicInput"
          defaultValue={channelName && channelName.topic}
        />
      </div>
      <div className="ChannelName">{channelName}</div>
    </div>
  );
}

export default ChannelInfo;
