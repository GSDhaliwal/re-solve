import React, { useContext, useEffect } from 'react';
import PlayerLobbyList from './PlayerLobbyList';
import createContext from '../createContext';
import "./lobby.css"

export default function Lobby(props) {


    const context = useContext(createContext);
    const playersData = props.players.map((player, index) => {
      return <PlayerLobbyList
                key={player.id}
                gamertag = {player.gamertag}
                host = {player.is_host}
              />
    })


  return (
    <section>
      <div className="gamecodeDis">
        <h4>Join code: {context.displayCode}</h4>
      </div>
      <div>
        <ul className="LplayerList">{playersData}</ul>
      </div>
      {context.isHost ? <button className="lobbymessage" onClick={()=>{
        context.startGame();
      }}>Start</button> : <div className="lobbymessage">Waiting for host to start game...</div>}
    </section>
  )
}
