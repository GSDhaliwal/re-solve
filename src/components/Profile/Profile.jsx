import React, { useContext, useEffect } from 'react';
import createContext from '../createContext';
import Login from "../Login"
import "./Profile.css";
import {
  BrowserRouter as Router,
  useHistory
} from "react-router-dom";
import "../back_button.css";


export default function Profile (props){

  //back button functionality
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }

  return (
    <section>
      <h4 className="joinPageText">Log In / Sign Up</h4>
      <button className="backButton" type = "button" onClick={()=>{

        handleClick()
      }}></button>
      <Login/>
    </section>
  )
}