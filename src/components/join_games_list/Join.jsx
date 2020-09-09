import React, { useEffect, useContext} from 'react';
import createContext from '../createContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


export default function GamesList(props) {
  const context = useContext(createContext);
  useEffect(()=>{
    context.setIsHost(false);
  },[]);
  let quizzes = props.quizzes;
  const updateGC = ((event) => { 
    context.setGameCode(event.target.value);
  })

  //back button functionality
  let history = useHistory();
  function handleClick() {
    context.setGameCode(null);
    history.push("/");
  }

  return (
    <section>
      <div>
        <h4>Join page</h4>
        <button type='button' onClick={handleClick}>
          Back
        </button>
        <form>
          <input type="text" placeholder="Enter game code to join..." onChange={updateGC}/>
          <button type="button" onClick={()=>{
            context.joinButton(context.gameCode);
          }}>
            Join
          </button>
        </form>
      </div>
    </section>
  );
}