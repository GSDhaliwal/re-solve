import React, { useContext } from 'react';
import createContext from "../createContext";
import "./gameslist.css";

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    // width: 'inheret',
    // length: 'inheret',
    // margin: 'inheret'
    height: '300px',
    border: '10px',
    margin: '10px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  bullet: {
    display: 'inline-block',
    // margin: '2px 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    justifyContent: "center",
  }
});



export default function Game(props) {

  const context = useContext(createContext);
  const classes = useStyles();

  return  (
              <Button variant="contained" type="button" className="button-card"
                  onClick={()=>{context.createGame(props.id)
                  console.log(props.id);}}>
              <Card className={classes.root} variant="outlined">

              <CardContent className="content-card">
                <Typography variant="h5" component="h2">{props.name}</Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>Category: {props.category}</Typography>
                <Typography className={classes.pos} color="textSecondary">Number of Questions: {props.num_of_questions}</Typography>
                <Typography className={classes.pos} color="textSecondary">Number of Times Hosted: {props.num_of_times_hosted}</Typography>
                <Typography className={classes.pos} color="textSecondary">Total Players Played: {props.total_players_played}</Typography>
                <Typography className={classes.pos} color="textSecondary">Difficulty: {props.difficulty}</Typography>
                
          
              </CardContent>

              </Card>
              </Button>)
};