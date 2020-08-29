import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';


// const base = io('/');


export default function App() {
  const socket = io('http://localhost:8080');
  let message;
  socket.on('message', (msg=>{
    message = msg;
  }));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
        onClick = {()=>{
          socket.emit("message", "look here bitch");
          console.log(message + " and " + socket.id);
        }}
        >
          TEST
        </button>
        <p>
        {message}
        </p>
      </header>
    </div>
  );
}
