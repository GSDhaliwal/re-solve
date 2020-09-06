import React,{useContext, useEffect, useState} from "react";
import createContext from "./createContext";
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
    // history.push(`/${prevState}`);
    console.log("button clicked !!!!!!");
    context.cancelCodeInput();
    // history.push('/join');
  }


  const buttonConditional = () => {
    if(context.isHost){ 
      return <button type = "button" onClick={()=>{
        context.cancelGame(context.currentgame)}}>
        Cancel
      </button>
    } else {
      return <button type='button' onClick={() => {handleClick()}}>
          Back
      </button>
    }
  }
  
 
  return (
  <div>
    <form>
      <input type="text" placeholder="Enter your display name here..." onChange={updateTag}/>
      <button type = "button" onClick={()=>{
        context.enterRoom(val, context.currentgame);
      }}>
        Enter
      </button>
    </form>
    {buttonConditional()}
 </div>
 )



}