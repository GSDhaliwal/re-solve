import React from 'react';

export default function PlayerLobbyList(props) {

  const hostPlayer = (props) => {
  //   if (props.host) {
  //     return  <div>
  //               <h1><em>{props.gamertag}</em></h1>
  //               <h4>{props.level}</h4>
  //               <button onClick={(()=>{
  //                 console.log("clicked: START GAME");
  //                 })}>START</button>
  //             </div>
  //   } else {
  //     return  <div>
  //             <h5>{props.gamertag}</h5>
  //             <h4>{props.level}</h4>
  //             </div>
  //   }
  // };

      return  <div>
                <h1>{props.gamertag}</h1>
                <h4>{props.level}</h4>
              </div>
  };

  return <div>
      {hostPlayer(props)}
    </div>;
}