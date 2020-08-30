import React from 'react';
import PlayerLobbyList from './PlayerLobbyList';

export default function Lobby(props) {
  let players = props.player.map((player, index) => {
    return <PlayerLobbyList
        gamertag = {player.player_gamertag}
        host = {player.is_host}
        level = {props.users[player.user_id].user_expertise_level}
      />
  })
  return (
    <section>
      <div>
        <h4>{players}</h4>
      </div>
    </section>
  )
}