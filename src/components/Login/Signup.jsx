import React, { useContext, useState } from "react";
import UserContext from "../Gameroom/UserContext";


export default function Signup(props){
  const[newName, setNewName] = useState();
  const[newPass, setNewPass] = useState();
  const context = useContext(UserContext);

  const newUser = (event)=>{
    setNewName(event.target.value);
  }
  const newPassword =(event)=>{
    setNewPass(event.target.value);
  }
  return <div>
    <form>
      <input type="text" placeholder="New username"onChange={newUser}/>
      <input type="text" placeholder="New password"onChange={newPassword}/>
      <button type = "button" onClick={()=>{context.register(newName, newPass)

      }}>
        Signup
      </button>
    </form>
  </div>
}