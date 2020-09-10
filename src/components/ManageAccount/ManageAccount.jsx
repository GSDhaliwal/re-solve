import React, { useContext } from 'react';
import createContext from '../createContext';
import UserQuizzes from './UserQuizzes';
import "./myquizzes.css";
import "../back_button.css";
import {
  BrowserRouter as Router,
  useHistory
} from "react-router-dom";


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
    <div className="gamesList">
      <h4 className="joinPageText">My Quizzes</h4>
      <button type="button" className="backButton" onClick={()=>{
        handleClick()
      }}></button>
      <div className="card">
        {userQuizzes}
      </div>
    </div>
  )
}