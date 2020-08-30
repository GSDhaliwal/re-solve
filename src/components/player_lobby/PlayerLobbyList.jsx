import React from 'react';

export default function PlayerLobbyList(props) {

  const hostPlayer = (props) => {
    if (props.host) {
      return  <div>
                <h2><strong>{props.gamertag}</strong></h2>
                <h3>{props.level}</h3>
                <button onClick={(()=>{
                  console.log("clicked: START GAME");
                  })}>START</button>
              </div>
    } else {
      return  <div>
              <h5>{props.gamertag}</h5>
              <h3>{props.level}</h3>
              </div>
    }
  };

  return <div>
      {hostPlayer(props)}
    </div>;
}