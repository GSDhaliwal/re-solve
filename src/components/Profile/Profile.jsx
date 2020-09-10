import React, { useContext, useEffect } from 'react';
import createContext from '../createContext';
import Login from "../Login"
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
      <h4 className="profilePageText">Profile Page</h4>
      <button type="button" className="backButton" onClick={()=>{
        handleClick()
      }}></button>
      <Login/>
    </section>
  )
}