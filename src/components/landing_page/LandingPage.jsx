import React, { useContext } from 'react';
import createContext from '../createContext';
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
      <div class="buttons">
            <Link to="/create">
              <Button variant="contained" class="sizing-button">
                Create Quiz
              </Button>
            </Link>
            <Link to="/host">
              <Button variant="contained" class="sizing-button">
                Host
              </Button>
            </Link>
            <Link to="/join">
              <Button variant="contained" class="sizing-button">
                Join
              </Button>
            </Link>
      </div>
  )
}