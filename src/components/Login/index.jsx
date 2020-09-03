import React, { useContext, useState, useEffect } from 'react';
import UserContext from "../Gameroom/UserContext"
import Signup from "./Signup";



export default function Login (props){


  const context = useContext(UserContext);
  const updateUsername = (event) =>{
    context.setUsername(event.target.value);
  }
  const updatePassword = (event) =>{
    context.setPassword(event.target.value);
  }


  return(
    <section>

    { !context.user ? (<form>
      <input 
        type="text" name="username" placeholder="username" onChange={updateUsername}
      />
      <input 
        type="text" name="password" placeholder="password" onChange={updatePassword}
      />
      <button type="button" onClick={()=>{context.verifyLogin(context.username, context.password)}}>
        Login
      </button>
      </form>) : 
      // context.user.username
       (<div>
      {context.user.username}
      <button onClick = {context.logout}>   
        Logout     
      </button>
      </div>)
      }
        
      

    </section>
  )
  
}