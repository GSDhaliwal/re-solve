import React, { useContext } from 'react';
import createContext from '../createContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function LandingPage() {

  return (
    <section>
      <div>
        <h3>Landing Page</h3>
          <button>
            <Link to="/create">Create Quiz</Link>
          </button>
          <button>
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