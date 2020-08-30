import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import Answer from "./components/Gameroom/Answer";
import Question from "./components/Gameroom/Question";
import Gameroom from "./components/Gameroom/Gameroom";

// const base = io('/');

const fQuestions = {
  1:{
  question:"what is 1+1?", 
  time_per_question:2,
  points_per_question:100,
  answers: [{content: "2", correct: true}, {content: "3", correct: false}, {content:"4", correct: false}]

},
  2:{
  id:2,
  question:"what is 2+2?", 
  time_per_question:3,
  points_per_question:250,
  answers: [{content: "4", correct: true}, {content: "3", correct: false}, {content:"4", correct: false}]
},
  3:{
  id:3,
  question:"what is 3+3?", 
  time_per_question:4,
  points_per_question:500,
  answers: [{content: "6", correct: true}, {content: "3", correct: false}, {content:"4", correct: false}]
} 
};

// const fanswers = [{content: "2", correct: true}, {content: "3", correct: false}, {content:"4", correct: false}];
const players = [
  {id:3, gamertag: "Henry", active_game_id: 3, score: 5000, user_id: 1, is_host: true},
  {id:1, gamertag: "lisa", active_game_id: 3, score: 500, user_id: 2,is_host: false},
  {id:2, gamertag: "rob", active_game_id: 3, score: 1500, user_id: 3, is_host: false}
]
const users = {
  1:{id: 1, name: "HM", expertise_level:"god"},
  2:{id: 2, name: "lis", expertise_level:"noob"},
  3:{id: 3, name: "dum", expertise_level: "negative"}
}

// const created_quizzes = {1:{
//   id:1,
//   quiz_name,
//   num_of_questions,
//   difficulty,
//   rating
// }}

const games = {1: {id:1, created_quiz_id:5, game_code:"ab", competition_mode_enabled:false}}
const game_id = 3;
let round = 1;
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
        <Gameroom
        key={game_id}
        round={round}
        players={players}
        users={users}
        questions ={fQuestions}
        />
      </header>
    </div>
  )
}
