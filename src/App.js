import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
import UserContext from "./components/Gameroom/UserContext";
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
  const [user, setUser] = useState();
  const [start, setStart] = useState(0);
  const [players, setPlayers] = useState();
  const [questions, setQuestions] = useState();
  const [gameDis, setGameDis] = useState();


  socket.on('GameroomQ', (qa)=>{
    console.log(qa);
    setQuestions(qa);
  });

  useEffect(()=>{
    setUser({id: 1, name: "HM", expertise_level:"god"});
  },[]);

  socket.on('playersCurrentRanking', (ranking=>{
    setPlayers(ranking);
    console.log(ranking);
    
  }));
  
  useEffect(()=>{
    setGameDis(<Gameroom
      key={game_id}
      players={players}
      questions ={questions}
      />);
  },[players, questions]);

  const sendAns=(ans)=>{
    socket.emit("message", JSON.stringify(ans));
    // console.log(message + " and " + socket.id);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          home page testing
        </p>
        <button
        onClick = {()=>{
          socket.emit('gameID', "1");
        }}
        >
          TEST
        </button>
        {/* <Question
          key={1}
          question={fQuestions}
          answers={fanswers}
        /> */}
        <button
          onClick={()=>{
            setStart(1);
          }}
        >
          Start Game
        </button>
        <UserContext.Provider value = {{user, setUser, sendAns}}>
        {start===1 && gameDis}
        </UserContext.Provider>
      </header>
    </div>
  )
}
