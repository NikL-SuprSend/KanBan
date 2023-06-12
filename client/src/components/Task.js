import React from "react";
import AddTask from "./AddTask";
import TaskWindow from "./TaskWindow";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");
const Task = () => {
  
  return (
    <div>
      <nav className="navbar">
        <h1>KanBan Board</h1>
      </nav>
      <AddTask socket={socket} />
      <TaskWindow socket={socket}  />
    </div>
  );
};

export default Task;
