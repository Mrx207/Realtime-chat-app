import React, { useState } from "react";
import "./home.css";
import { ROOM_NAME } from "../../utils/constant-util";
import { useNavigate } from "react-router-dom";

const Home = ({ username, setUsername, room, setRoom, socket }) => {
  const navigate = useNavigate();
  // Add this
  const joinRoom = () => {
    if (room !== "" && username !== "") {
      socket.emit("join_room", { username, room });
      navigate("/chat", { replace: true }); // Add this
    } else {
      alert("fill all the details");
    }
  };
  return (
    <div className="container">
      <h2>Dev Rooms</h2>
      <div className="form">
        <input
          placeholder="Username"
          name="username"
          value={username}
          className="form-element"
          onChange={(e) => setUsername(e.target.value)}
        />

        <select
          name="selectRoom"
          className="form-element"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        >
          {ROOM_NAME.map((option, index) => {
            return (
              <option value={option.value} key={index}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
      <button className="btn" onClick={joinRoom}>
        Join Room
      </button>
    </div>
  );
};

export default Home;
