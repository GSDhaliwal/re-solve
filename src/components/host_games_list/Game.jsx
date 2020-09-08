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
  // const bull = <span className={classes.bullet}>•</span>;

    return  <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>{props.name}</Typography>
                <Typography variant="h5" component="h2">Category: {props.category}</Typography>
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

    // return  <div>
    //           <button
    //             type="button"  
    //             onClick={()=>{context.createGame(props.id)
    //               // context.setToggle(true);
    //             console.log(props.id);}}>


    //             <h2>{props.name}</h2>
    //             <h3>Category: {props.category}</h3>
    //             <h4>Number of Questions: {props.num_of_questions} /  Rating: {props.rating}</h4>
    //             <h4>Number of Times Hosted: {props.num_of_times_hosted} /  Total Players Played: {props.total_players_played}</h4>
    //             <h4>Difficulty: {props.difficulty}</h4>

    return  <div>
              <button
                type="button"  
                onClick={()=>{context.createGame(props.id)
                  // context.setToggle(true);
                console.log(props.id);}}>
                <h2>{props.name}</h2>
                <h3>Category: {props.category}</h3>
                <h4>Number of Questions: {props.num_of_questions}</h4>
                <h4>Number of Times Hosted: {props.num_of_times_hosted} /  Total Players Played: {props.total_players_played}</h4>
                <h4>Difficulty: {props.difficulty}</h4>
              </button>
            </div>
              
    


    //           </button>
    //         </div>
  // return <div>{userHost(props)}</div>;
};