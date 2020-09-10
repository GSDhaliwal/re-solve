import React, { useContext } from 'react';
import createContext from '../createContext';
import UserQuizzes from './UserQuizzes'
import {
  BrowserRouter as Router,
  useHistory
} from "react-router-dom";
import "../back_button.css";


export default function ManageAccount(props) {

  const context = useContext(createContext);

  //back button functionality
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }
  
  

  const userQuizzes = context.userQuizzes.map((quiz, index) => {
      return <UserQuizzes
              key={quiz.id}
              id={quiz.id}
              quizName={quiz.quiz_name}
              numOfQ={quiz.num_of_questions}
              difficulty={quiz.difficulty}
              numOfTimesHosted={quiz.num_of_times_hosted}
              totalPlayersPlayed={quiz.total_players_played}
              category={quiz.category_name}  
              />
    })

  return (
    <section>
      <button className="backButton" type="button" onClick={()=>{
        handleClick()
      }}>Back</button>
      {userQuizzes}
    </section>
  )
}