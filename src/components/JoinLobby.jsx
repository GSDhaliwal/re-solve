import React,{useContext, useEffect, useState} from "react";
import createContext from "./createContext";
import "./Joinlobby.css"
import "./back_button.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

export default function JoinLobby(props){

  const [val, setVal] = useState();
  const context = useContext(createContext);
  const updateTag = (event)=>{
    setVal(event.target.value);
  }

  //back button functionality
  let history = useHistory();
  function handleClick() {
    context.cancelCodeInput();
  }

  const buttonConditional = () => {
    if(context.isHost){ 
      return <button className ="backButton" type = "button" onClick={()=>{
        context.cancelGame(context.currentgame)}}>
      </button>
    } else {
      return <button className ="backButton" type='button' onClick={() => {handleClick()}}>
      </button>
    }
  }
  
 
  return (
  <div>
    <form>
      <input type="text" className="gnameInput"placeholder="Enter your display name here..." onChange={updateTag}/>
      <br/>
      <button className = "EnterButton"type = "button" onClick={()=>{
        context.enterRoom(val, context.currentgame);
      }}>
        Enter
      </button>
    </form>
    {buttonConditional()}
 </div>
 )



}