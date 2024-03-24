import React, { useState } from "react";

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message !== "") {
      const __createdtime__ = Date.now();
      socket.emit("send_message", { username, room, message, __createdtime__ });
      setMessage("");
    }
  };
  return (
    <div className="send-section">
      <input
        name="message"
        placeholder="enter your message"
        className="form-element msg-input"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className="btn send-btn" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default SendMessage;
