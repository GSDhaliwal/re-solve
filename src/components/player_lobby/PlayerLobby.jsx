import React, { useContext, useEffect } from 'react';
import PlayerLobbyList from './PlayerLobbyList';
import createContext from '../createContext';
// import {ValueContext} from "../../App.js";

export default function Lobby(props) {


    const context = useContext(createContext);
    const playersData = props.players.map((player, index) => {
      return <PlayerLobbyList
                key={player.id}
                gamertag = {player.gamertag}
                host = {player.is_host}
              />
    })

    useEffect(() => {
      console.log("hi hi" , context.displayCode);
    },[context.displayCode]);

  return (
    <section>
      <div>
        <h4>game code: {context.displayCode}</h4>
      </div>
      <div>
        <h4>{playersData}</h4>
      </div>
      {context.isHost ? <button onClick={()=>{
        context.startGame();
      }}>Start</button> : "Waiting for host to start game..."}
    </section>
  )
}
