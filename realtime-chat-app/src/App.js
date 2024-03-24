import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import io from "socket.io-client";
import Chat from "./pages/chat";
import { useState } from "react";
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("javascript");
  const socket = io.connect("http://localhost:4000"); //-- our server will run on port 4000, so we connect to it from here

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                username={username}
                setUsername={setUsername}
                room={room}
                setRoom={setRoom}
                socket={socket}
              />
            }
          />
          <Route
            path="/chat"
            element={<Chat username={username} room={room} socket={socket} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
