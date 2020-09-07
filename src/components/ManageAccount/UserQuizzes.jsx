import React, { useContext } from 'react';
import createContext from "../createContext";


export default function Game(props) {

  const context = useContext(createContext);

    return  <div>
              <button
                type="button"  
                onClick={()=>{
                  context.bar(props.id);
                }}>
                <h2>{props.quizName}</h2>
                <h3>Category: {props.category}</h3>
                <h4>Number of Questions: {props.numOfQ}</h4>
                <h4>Number of Times Hosted: {props.numOfTimesHosted} /  Total Players Played: {props.totalPlayersPlayed}</h4>
                <h4>Difficulty: {props.difficulty}</h4>
              </button>
            </div>
              
    
};
