import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import Answer from "./components/Answer";
import Question from "./components/Question";
import PlayerLobby from "./components/player_lobby/PlayerLobby";

// import ValueContext from "./components/player_lobby/ValueContext";

// const base = io('/');

const fQuestions = "what is 1+1?";
const fanswers = [{content: "2", correct: true}, {content: "3", correct: false}, {content:"4", correct: false}];

// const playerData = [
//   {user_id: 1, player_gamertag: "Hero", score: 12, is_host: false},
//   {user_id: 2, player_gamertag: "Paws", score: 23, is_host: false},
//   {user_id: 3, player_gamertag: "Kylo", score: 69, is_host: true},
//   {user_id: 4, player_gamertag: "Loko", score: 33, is_host: false},
//   {user_id: 5, player_gamertag: "Shadow", score: 42, is_host: false}
// ];

// const users = {
//   1:{id: 1, name: "Henry", email: "henry@xp.com", password: "###", user_expertise_level: "S Rank"},
//   2:{id: 2, name: "Felipe", email: "felipe@xp.com", password: "###", user_expertise_level: "B Rank"},
//   3:{id: 3, name: "Gurcharan", email: "chanchan@xp.com", password: "###", user_expertise_level: "A Rank"},
//   4:{id: 4, name: "Link", email: "elite@xp.com", password: "###", user_expertise_level: "C Rank"},
//   5:{id: 5, name: "Soma", email: "soma@xp.com", password: "###", user_expertise_level: "S Rank"},
//   6:{id: 6, name: "Valen", email: "soma@xp.com", password: "###", user_expertise_level: "F Rank"}
// };

// export const ValueContext = React.createContext();

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
    // setSocket(socket);
    console.log("connecting to socket");
    // let message;
    // socket.on('message', (msg=>{
    //   let message = JSON.parse(msg);
    //   setState((prevState) => ({...prevState, playerData: [...prevState.playerData, message]}))
      // setValue(playerData);
      // console.log("1:", playerData);
      // }));
  // },[]);

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
