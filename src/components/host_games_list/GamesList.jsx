import React, { useEffect } from 'react';
import Game from './Game';

export default function GamesList(props) {

  let quizzes = props.quizzes;
  console.log("quizzes --> ", quizzes);

  const quizData = quizzes.map((quiz, index) => {
      return <Game
                key={quiz.id}
                user={quiz.user_id}
                gamertag = {quiz.player_gamertag}
                name={quiz.quiz_name}
                num_of_questions={quiz.num_of_questions}
                difficulty={quiz.difficulty}
                rating={quiz.rating}
                num_of_times_hosted={quiz.num_of_times_hosted}
                total_players_played={quiz.total_players_played}
                category={quiz.category_name}
              />
    })

  return (
    <section>
      <div>
        <h4>host page</h4>
        <h4>{quizData}</h4>
      </div>
    </section>
  );
}



//NOT USED
  // const sortQuizByCategory = props.quizzes.sort(function(a, b) {
  //   let categoryA = props.categories[a.category_id].category_name.toUpperCase();
  //   let categoryB = props.categories[b.category_id].category_name.toUpperCase();
  //   if (categoryA === categoryB) {
  //     let nameA = a.quiz_name.toUpperCase();
  //     let nameB = b.quiz_name.toUpperCase();
  //     if (nameA < nameB) {
  //       return -1;
  //     }
  //     if (nameA > nameB) {
  //       return 1;
  //     }
  //     return 0;
  //   }
  //   if (categoryA < categoryB) {
  //     return -1;
  //   }
  //   if (categoryA > categoryB) {
  //     return 1;
  //   }
  //   return 0;
  // });