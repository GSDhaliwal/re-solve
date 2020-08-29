import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import Answer from "./components/Answer";
import Question from "./components/Question";

// const base = io('/');

const fQuestions = "what is 1+1?";
const fanswers = [{content: "2", correct: true}, {content: "3", correct: false}, {content:"4", correct: false}];

export default function App() {
  const socket = io('http://localhost:8080');
  let message;
  socket.on('message', (msg=>{
    message = msg;
  }));
  return (
    <div className="App">
      <header className="App-header">
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
        {/* <Question
          key={1}
          question={fQuestions}
          answers={fanswers}
        /> */}
      </header>
    </div>
  )
}
