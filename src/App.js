import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import Answer from "./components/Answer";
import Question from "./components/Question";
import Create from "./components/Create/Create";

// const base = io('/');

const fQuestions = "what is 1+1?";
const fanswers = [{content: "2", correct: true}, {content: "3", correct: false}, {content:"4", correct: false}];

const categories = [{id:1, categories_name: 'math'}, {id:2, categories_name: 'science'}, {id:3, categories_name: 'coding'}]

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
        <Create 
          key={categories.id}
          categories={categories}
        />
        {/* <Question
          key={1}
          question={fQuestions}
          answers={fanswers}
        /> */}
      </header>
    </div>
  )
}
