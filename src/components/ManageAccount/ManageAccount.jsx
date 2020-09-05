import React, { useContext } from 'react';
import createContext from '../createContext';
import UserQuizzes from './UserQuizzes'


export default function ManageAccount(props) {

  const context = useContext(createContext);
  
  

  const userQuizzes = context.userQuizzes.map((quiz, index) => {
      return <UserQuizzes
              key={quiz.id}
              id={quiz.id}
              quizName={quiz.quiz_name}
              numOfQ={quiz.num_of_questions}
              difficulty={quiz.difficulty}
              rating={quiz.rating}
              numOfTimesHosted={quiz.num_of_times_hosted}
              totalPlayersPlayed={quiz.total_players_played}
              category={quiz.category_name}  
              />
    })

  return (
    <section>
      <h1>Hey</h1>
      {userQuizzes}
    </section>
  )
}