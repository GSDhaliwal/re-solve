import React, { createContext } from "react";
import UserContext from "./Gameroom/UserContext";

export default function JoinLobby(props){

  const updateTag = (event)=>{
    context.setGamerTag(event.target.value);
  }
  const context = createContext(UserContext);
  return (<form>
    <input type="text" placeholder="Enter your display name here..." onChange={updateTag}/>
    <button onClick={context.enterRoom}>

    </button>
  </form>)
}