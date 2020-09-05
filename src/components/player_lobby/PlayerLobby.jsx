import React, { useContext } from 'react';
import PlayerLobbyList from './PlayerLobbyList';
import createContext from '../createContext';
// import {ValueContext} from "../../App.js";

export default function Lobby(props) {

  // const {value} = React.useContext(ValueContext);

  // const [players, setPlayers] = React.useState([]);

  // React.useEffect(() => {
  //   console.log("playersRound1:", players);
  //   setPlayers(props.player);
  //   console.log("playersRound2:", players);
  //   // createPlayerList();
  // }, [players, props.player]);

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
      <div>
        <h4>{playersData}</h4>
      </div>
      {context.isHost ? <button onClick={()=>{
        context.startGame();
      }}>Start???</button> : "Waiting for host to start game..."}
    </section>
  )
}
