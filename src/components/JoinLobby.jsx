import React,{useContext, useEffect} from "react";
import createContext from "./createContext";

export default function JoinLobby(props){

  const context = useContext(createContext);
  const updateTag = (event)=>{
    context.setGamerTag(event.target.value);
  }
 
  return (
  <div>
  <form>
    <input type="text" placeholder="Enter your display name here..." onChange={updateTag}/>
    <button type = "button" onClick={()=>{
      context.enterRoom(context.gamerTag, context.currentgame)
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