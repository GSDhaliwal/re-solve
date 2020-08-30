import React from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import Answer from "./components/Answer";
import Question from "./components/Question";
import PlayerLobby from "./components/player_lobby/PlayerLobby";

// const base = io('/');

const fQuestions = "what is 1+1?";
const fanswers = [{content: "2", correct: true}, {content: "3", correct: false}, {content:"4", correct: false}];

const playerData = [
  {user_id: 1, player_gamertag: "Hero", score: "", is_host: false},
  {user_id: 2, player_gamertag: "Paws", score: "", is_host: false},
  {user_id: 3, player_gamertag: "Kylo", score: "", is_host: true},
  {user_id: 4, player_gamertag: "Loko", score: "", is_host: false}
];

const users = {
  1:{id: 1, name: "Henry", email: "henry@xp.com", password: "###", user_expertise_level: "S Rank"},
  2:{id: 2, name: "Felipe", email: "felipe@xp.com", password: "###", user_expertise_level: "B Rank"},
  3:{id: 3, name: "Gurcharan", email: "chanchan@xp.com", password: "###", user_expertise_level: "A Rank"},
  4:{id: 4, name: "Rob", email: "elite@xp.com", password: "###", user_expertise_level: "C Rank"}
};



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
          Test
        </button>
        <h3>Lobby</h3>
        <PlayerLobby
          // player={playerData}
          // users={users}
        />
      </header>
    </div>
  )
}
