import React, { useContext } from 'react';
import createContext from "../createContext";

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '300px',
    height: '275px',
    border: '10px',
    margin: '10px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
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

    return  <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">{props.name}</Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>Category: {props.category}</Typography>
                <Typography className={classes.pos} color="textSecondary">Number of Questions: {props.num_of_questions}</Typography>
                <Typography className={classes.pos} color="textSecondary">Number of Times Hosted: {props.num_of_times_hosted}</Typography>
                <Typography className={classes.pos} color="textSecondary">Total Players Played: {props.total_players_played}</Typography>
                <Typography className={classes.pos} color="textSecondary">Difficulty: {props.difficulty}</Typography>
                <CardActions className={classes.button}>
                  <Button size="small" type="button"  
                  onClick={()=>{context.createGame(props.id)
                  console.log(props.id);}}>Host Game</Button>
                </CardActions>
              </CardContent>
            </Card>
};