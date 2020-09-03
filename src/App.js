
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import Answer from "./components/Answer";
import Question from "./components/Question";



import React, { useState, useEffect } from 'react';


import './App.css';
import io from 'socket.io-client';
import UserContext from "./components/Gameroom/UserContext";
import Gameroom from "./components/Gameroom/Gameroom";
import Login from "./components/Login"
import Signup from "./components/Login/Signup"
import GamesList from "./components/host_games_list/GamesList";
import createContext from "./components/createContext";
import PlayerLobby from "./components/player_lobby/PlayerLobby";
const game_id = 1;


export default function App() {

  const [initilized, setInitialized] = useState(false);
  // const [socket, setSocket] = useState(null);
  const [gameCode, setGameCode] = useState(117);
  const [players, setPlayers] = useState({});
  const socket = io('http://localhost:8080');




  const [user, setUser] = useState();
  const [gamerTag, setGamerTag] = useState("bigdaddy");
  const [start, setStart] = useState(0);
  const [players, setPlayers] = useState();
  const [questions, setQuestions] = useState();
  const [gameDis, setGameDis] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [answered, setAnswered] = useState(false);
  const [whichAns, setWhichAns] = useState();
  const [sign, setSign] = useState(false);
  const [quiz, setQuiz] = useState({});
  const [category, setCategory] = useState({});
  const [initilizedQuiz, setInitializedQuiz] = useState(false);
  const [initilizedCategory, setInitializedCategory] = useState(false);


  socket.on('playersCurrentRanking', (ranking=>{
    setPlayers(ranking);
    console.log("ranking?:",ranking);
  }));
  
  
    useEffect (() => {
    // socket.emit('hostGames', '1');
    // console.log("log after socket emit - hostGames");
    socket.emit('listplayers', gameCode);
    socket.on('playerslist', (data =>{
    setPlayers(data);
    console.log("players data --> ", players);
    setInitialized(true);
  }));
    console.log("listplayers loggoned on");
  },[]);
  
  useEffect(()=>{
    console.log("update ranking?");
    
    setGameDis(<Gameroom
      key={game_id}
      players={players}
      questions ={questions}
      />);
  },[players, questions]);

  const sendAns=(gamer, score)=>{
    socket.emit("updateScore", {gamer, score, game_id});
  }

  const verifyLogin = (username, password)=>{
    socket.emit('userL', {username, password});
    socket.once("loggedUser", (logged)=>{
      if(logged){
        setUser(logged);
        // console.log(logged);
      }else{
        alert("you fucked up");
      }
    })
  }
  const logout = ()=>{
    if(user){
      setUser(null);
    }
  }
  const register = (u, p)=>{
    socket.emit("register", {username: u, password: p});
    socket.once("reggedUser", (logged)=>{
        if(logged){
          setUser(logged);
          console.log("logged", logged);
        } else{
          alert("username already taken");
        }
        
    })
  }
  useEffect(()=>{
    socket.emit('gameID', game_id);
    socket.on('GameroomQ', (qa)=>{
      console.log(qa);
      setQuestions(qa);
    });
  },[])
    
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



  useEffect (() => {
    socket.emit('hostGames', '1');
    console.log("log after socket emit - hostGames");
  },[]);
    
  if (!initilizedQuiz && !initilized) {
    return null;
  }

  return (
    <div className="App">
      <header className="App-header">
      <UserContext.Provider value = {{user, setUser, verifyLogin, 
          username, setUsername, password, setPassword, logout, 
          gamerTag, answered, setAnswered, whichAns, setWhichAns, sendAns, setPlayers, register}}>
      <Login/>
      
          {start===1 && gameDis}
        </UserContext.Provider>
        <p>
          home page testing
        </p>
   
        <h3>Lobby</h3>
        {/* <ValueContext.Provider value={{value}}> */}
          <PlayerLobby
            players={players}
          />
        {/* </ValueContext.Provider> */}

        <button
          onClick={()=>{
            setStart(1);
          }}
        >
          Start Game
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