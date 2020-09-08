import React, { useContext } from 'react';
import createContext from '../createContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


//Material UI
import Button from '@material-ui/core/Button';

export default function LandingPage() {
  const context = useContext(createContext);
  return (
    <section>
      <div>
        <h3>Landing Page</h3>
          <button>
            <Link to="/create">Create Quiz</Link>
          </button>
          <button onClick={()=>{
          }}>
            <Link to="/host">Host</Link>
          </button> 
          <button>
            <Link to="/join">Join</Link>
          </button>
        <h3>------------------------</h3>
      </div>
    </section>
  )
}