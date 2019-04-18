import React, { useRef, useEffect, useState } from "react";
import isSameDay from "date-fns/is_same_day";
import differenceInHours from "date-fns/difference_in_hours";
import ChatWithAvatar from "./ChatWithAvatar";
import ChatWithOutAvatar from "./ChatWithOutAvatar";
import { db } from "./firebase";

function ChatScroller(props) {
  const scroller = useRef();
  const isToBottom = useRef(true);

  //another way to scroll to bottom
  // useEffect(() => {
  //   const newMsg =
  //     scroller.current.children[scroller.current.children.length - 1];

  //   const newMsgHeight = newMsg.offsetHeight;

  //   if (
  //     scroller.current.scrollHeight - newMsgHeight <=
  //       scroller.current.scrollTop + scroller.current.clientHeight ||
  //     isToBottom
  //   )
  //     scroller.current.scrollTop = scroller.current.scrollHeight;

  //   isToBottom.current = false;
  // });

  useEffect(() => {
    if (isToBottom.current) {
      scroller.current.scrollTop = scroller.current.scrollHeight;
    }
  });
  function handleScroll() {
    const { scrollTop, scrollHeight, offsetHeight } = scroller.current;
    isToBottom.current = scrollTop + offsetHeight >= scrollHeight;
  }

  return (
    <div {...props} ref={scroller} onScroll={handleScroll}>
      {props.children}
    </div>
  );
}

function Messages({ channelName }) {
  const [messages, setMessages] = useState();

  useEffect(() => {
    return db()
      .collection(`channels/${channelName}/messages`)
      .orderBy("createdAt")
      .onSnapshot(function(querySnapshot) {
        const newMessages = [];
        querySnapshot.forEach(doc =>
          newMessages.push({ ...doc.data(), id: doc.id })
        );
        setMessages(newMessages);
      });
  }, [channelName]);

  return (
    <ChatScroller className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages &&
        messages.map((message, i) => {
          const showAvatar = shouldShowAvatar(messages[i], messages[i - 1]);
          return (
            <div key={message.id}>
              {showDay(messages, i, message)}
              {showAvatar ? (
                <ChatWithAvatar message={message} />
              ) : (
                <ChatWithOutAvatar message={message} />
              )}
            </div>
          );
        })}
    </ChatScroller>
  );
}

function shouldShowDay(prev, curr) {
  if (!prev) return true;
  return !isSameDay(getInmilSeconds(prev), getInmilSeconds(curr));
}

function showDay(messages, i, message) {
  const isSameDay = shouldShowDay(messages[i - 1], messages[i]);
  return isSameDay ? (
    <div className="Day">
      <div className="DayLine" />
      <div className="DayText">
        {new Date(message.createdAt.seconds * 1000).toLocaleDateString()}
      </div>
      <div className="DayLine" />
    </div>
  ) : (
    ""
  );
}

function shouldShowAvatar(curr, prev) {
  if (!prev) return true;
  if (prev.user.id !== curr.user.id) return true;
  return differenceInHours(getInmilSeconds(prev), getInmilSeconds(curr)) > 1
    ? true
    : false;
}

function getInmilSeconds(msg) {
  return msg.createdAt.seconds * 1000;
}
export default Messages;
