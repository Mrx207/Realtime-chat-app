import React from "react";

export const Chat = () => {
  return (
    <div className="chat-container">
      <div className="user-section">
        <h2>Node</h2>
        <ul className="user-list">
          <li>User 1</li>
          <li>User 2</li>
          <li>User 3</li>
        </ul>
        <button className="btn">Leave</button>
      </div>
      <div className="vertical-bar"></div>
      <div className="chat-section">
        <input
          name="message"
          placeholder="enter your message"
          className="form-element msg-input"
        />
        <button className="btn send-btn">Send</button>
      </div>
    </div>
  );
};
