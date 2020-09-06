import React, { useContext, useEffect } from 'react';
import createContext from '../createContext';
import Login from "../Login"


export default function Profile (props){

  return (
    <section>
      <h4>Profile Page</h4>
      <Login/>
    </section>
  )
}