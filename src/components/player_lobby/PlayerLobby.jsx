import React from 'react';
import PlayerLobbyList from './PlayerLobbyList';
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


    const playersData = props.players.map((player, index) => {
      return <PlayerLobbyList
                key={player.user_id}
                gamertag = {player.gamertag}
                host = {player.is_host}
              />
    })

  return (
    <section>
      <div>
        <h4>{playersData}</h4>
      </div>
    </section>
  )
}
