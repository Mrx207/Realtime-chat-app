import React from "react";
import "./chat.css";
import RoomDisplay from "../../components/RoomDisplay";
import ChatSection from "../../components/ChatSection";
import SendMessage from "../../components/SendMessage";

const Chat = ({ socket, username, room }) => {
  return (
    <div className="chat-container">
      <div className="user-section">
        <RoomDisplay users={"users"} roomName={"roomName"} />
      </div>
      <div className="vertical-bar"></div>
      <div className="chat-section">
        <ChatSection socket={socket} username={username} room={room} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default Chat;
