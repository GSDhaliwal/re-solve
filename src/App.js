import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import Answer from "./components/Answer";
import Question from "./components/Question";
import PlayerLobby from "./components/player_lobby/PlayerLobby";


export default function App() {

  const [initilized, setInitialized] = useState(false);
  // const [socket, setSocket] = useState(null);
  const [gameCode, setGameCode] = useState(117);
  const [players, setPlayers] = useState({});

  // socket.on('gameslist', (data=>{
  //   setQuiz(data);
  //   setInitializedQuiz(true);
  // }));

  // useEffect(() => {
  const socket = io('http://localhost:8080');
  console.log("connecting to socket");


  socket.on('playerslist', (data =>{
    setPlayers(data);
    console.log("players data --> ", players);
    setInitialized(true);
  }));


  useEffect (() => {
    // socket.emit('hostGames', '1');
    // console.log("log after socket emit - hostGames");
    socket.emit('listplayers', gameCode);
    console.log("listplayers loggoned on");
  },[]);




  
  if (!initilized) {
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
          // let newPlayer = {user_id: 6, player_gamertag: "Valen", score: 7, is_host: false};
          socket.emit("message", JSON.stringify({user_id: 6, player_gamertag: "Valen", score: 7, is_host: false}));
          // console.log(message + " and " + socket.id);
        }}
        >
          Test
        </button>
        <h3>Lobby</h3>
        {/* <ValueContext.Provider value={{value}}> */}
          <PlayerLobby
            players={players}
          />
        {/* </ValueContext.Provider> */}
      </header>
    </div>
  )
}
