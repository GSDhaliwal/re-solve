import React, { useContext } from 'react';
import createContext from '../createContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function LandingPage() {
  const context = useContext(createContext);
  return (
    <section>
      <div>
        <h3>Landing Page</h3>
          <button>
            <Link to="/create">Create Quiz</Link>
          </button>
            <Link to="/host">
              <button>
                Host
              </button> 
            </Link>
          
          <button>
            <Link to="/join">Join</Link>
          </button>
        <h3>------------------------</h3>
      </div>
    </section>
  )
}