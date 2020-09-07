import React, { useContext } from 'react';
import createContext from "../createContext";


export default function Game(props) {

  const context = useContext(createContext);

    return  <div>
              <button
                type="button"  
                onClick={()=>{context.createGame(props.id)
                  // context.setToggle(true);
                console.log(props.id);}}>
                <h2>{props.name}</h2>
                <h3>Category: {props.category}</h3>
                <h4>Number of Questions: {props.num_of_questions}</h4>
                <h4>Number of Times Hosted: {props.num_of_times_hosted} /  Total Players Played: {props.total_players_played}</h4>
                <h4>Difficulty: {props.difficulty}</h4>
              </button>
            </div>
              
    

  // return <div>{userHost(props)}</div>;
};
