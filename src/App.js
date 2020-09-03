import React, { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';
import UserContext from "./components/Gameroom/UserContext";
import Gameroom from "./components/Gameroom/Gameroom";
import Login from "./components/Login"
import Signup from "./components/Login/Signup"
const game_id = 1;
export default function App() {
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




  socket.on('playersCurrentRanking', (ranking=>{
    setPlayers(ranking);
    console.log("ranking?:",ranking);
  }));
  
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
        
        <button
          onClick={()=>{
            setStart(1);
          }}
        >
          Start Game
        </button>
        
      </header>
    </div>
  )
}
