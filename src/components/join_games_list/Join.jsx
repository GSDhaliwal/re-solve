import React, { useEffect, useContext} from 'react';
import createContext from '../createContext';
import "../back_button.css";
import "./Join.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


export default function Join(props) {
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
        <h4 className="joinPageText">Join page</h4>
        <button type='button' className="backButton" onClick={handleClick}>
        </button>
        <form>
          <input className="joinPageInput" type="text" placeholder="Enter game code to join..." onChange={updateGC}/>
          <br/>
          <button className="button" type="button" onClick={()=>{
            context.joinButton(context.gameCode);
          }}>
            Join
          </button>
        </form>
      </div>
    </section>
  );
}