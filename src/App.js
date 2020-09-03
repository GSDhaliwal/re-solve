import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import Answer from "./components/Answer";
import Question from "./components/Question";
import GamesList from "./components/host_games_list/GamesList";
import createContext from "./components/createContext";


export default function App() {

  const [quiz, setQuiz] = useState({});
  const [category, setCategory] = useState({});
  const [user, setUser] = useState({});
  const [initilizedQuiz, setInitializedQuiz] = useState(false);
  const [initilizedCategory, setInitializedCategory] = useState(false);

  const socket = io('http://localhost:8080');
  let message;

  const createGame = (quizID)=>{
    socket.emit('hostableGame', {quizID});
  };

  socket.on('gameslist', (data=>{
    setQuiz(data);
    setInitializedQuiz(true);
  }));
  
  useEffect(() =>{
    console.log("logging quiz: ", quiz);
    // console.log("logging category: ", category);
  },[quiz]);

  useEffect(()=>{
    setUser({name: "KyloRen", password: "123"});
  },[]);

  useEffect (() => {
    socket.emit('hostGames', '1');
    console.log("log after socket emit - hostGames");

  },[]);






  if (!initilizedQuiz && !initilizedCategory) {
    return null;
  }
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
        <createContext.Provider value = {{createGame}}>
          <GamesList
            quizzes={quiz}
          />
        </createContext.Provider>
      </header>
    </div>
  )
}