import React from "react";

const RoomDisplay = ({ roomName, users }) => {
  return (
    <>
      <h2>Node</h2>
      <ul className="user-list">
        <li>User 1</li>
        <li>User 2</li>
        <li>User 3</li>
      </ul>
      <button className="btn">Leave</button>
    </>
  );
};

export default RoomDisplay;
