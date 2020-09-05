import React,{useContext, useEffect, useState} from "react";
import createContext from "./createContext";

export default function JoinLobby(props){

  const [val, setVal] = useState();
  const context = useContext(createContext);
  const updateTag = (event)=>{
    setVal(event.target.value);
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
   <button type = "button" onClick={()=>{
     context.cancelGame(context.currentgame)}}>
   Cancel
 </button>
 </div>
 )



}