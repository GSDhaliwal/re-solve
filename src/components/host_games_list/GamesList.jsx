import React, { useEffect, useContext} from 'react';
import Game from './Game';
import createContext from '../createContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


export default function GamesList(props) {
  const context = useContext(createContext);
  let quizzes;
  useEffect(()=>{
    context.setIsHost(true);
    console.log("inside gamelist quizlist:", context.quizlist);

  },[]);
  console.log("quizzes --> ", props.quizzes);


  //back button functionality
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }
  const quizData = context.quizlist.map((quiz, index) => {
    return <Game
              key={quiz.id}
              id={quiz.id}
              user={quiz.user_id}
              gamertag = {quiz.player_gamertag}
              name={quiz.quiz_name}
              num_of_questions={quiz.num_of_questions}
              difficulty={quiz.difficulty}
              num_of_times_hosted={quiz.num_of_times_hosted}
              total_players_played={quiz.total_players_played}
              category={quiz.category_name}
            />
  })
   

  return (
    // <section>
      <div>
        <h4>host page</h4>
        <button type='button' onClick={handleClick}>
          Back
        </button>
        <h4>{quizData}</h4>
      </div>
    // </section>
  );
}