import React from 'react';

export default function PlayerLobbyList(props) {

  const hostPlayer = (props) => {
    return  <li className="eachPlayer">
              {props.gamertag}
            </li>
  };

  return <div>
      {hostPlayer(props)}
    </div>;
}