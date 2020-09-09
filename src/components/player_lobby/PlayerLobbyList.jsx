import React from 'react';

export default function PlayerLobbyList(props) {

  const hostPlayer = (props) => {
    return  <div>
              <h1>{props.gamertag}</h1>
            </div>
  };

  return <div>
      {hostPlayer(props)}
    </div>;
}