import React, { useContext, useState, useEffect } from 'react';
import UserContext from "../Gameroom/UserContext"
import Signup from "./Signup";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";



export default function Login (props){


  const context = useContext(UserContext);
  const updateUsername = (event) =>{
    context.setUsername(event.target.value);
  }
  const updatePassword = (event) =>{
    context.setPassword(event.target.value);
  }

  //back button functionality
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }


  return(
    <section>

    { !context.user ? (
    <div>
    <form>
      <input 
        type="text" name="username" placeholder="username" onChange={updateUsername}
      />
      <input 
        type="text" name="password" placeholder="password" onChange={updatePassword}
      />
      <button type="button" onClick={()=>{
        context.verifyLogin(context.username, context.password)
        handleClick()}}>
        Login
      </button>
      </form>
      <br/>
      <Signup/>
      </div>)
      : 
       (<div>
      <h4>Hello, {context.user.username}! You are signed in!</h4>
      </div>)
      }
        
      

    </section>
  )
  
}