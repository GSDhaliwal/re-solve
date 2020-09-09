import React, { useContext } from 'react';
import createContext from '../createContext';
import "../back_button.css"
import "./Landingpage.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }
}));

export default function LandingPage() {
  const context = useContext(createContext);
  const classes = useStyles(); //<-- allows for style changes


  return (

      <div className="buttons">

            {/* <button type="button" className="backButton" onClick={() => {console.log("hi")}}>
            </button> */}

            <Link to="/create" className="links">
              <Button variant="contained" class="sizing-button first">
                Create
              </Button>
            </Link>

            <Link to="/host" className="links">
              <Button variant="contained" class="sizing-button first">

                Host
              </Button>
            </Link>

            <Link to="/join" className="links">
              <Button variant="contained" class="sizing-button first">

                Join
              </Button>
            </Link>
      </div>

  )
}