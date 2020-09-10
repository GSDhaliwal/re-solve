import React, { useContext, useState } from "react";
import UserContext from "../Gameroom/UserContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import "./loginSignup.css";

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

  //back button functionality
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }


  return <div className="signupAndLogin">
    <form>

      <input className="signupAndLoginInput" type="text" placeholder="New username"onChange={newUser}/>
      <input className="signupAndLoginInput" type="password" placeholder="New password"onChange={newPassword}/>
      <br/>
      <button className="button" type="button" onClick={()=>{
        context.register(newName, newPass)
        handleClick()
      }}>
        Signup
      </button>
    </form>
  </div>
}