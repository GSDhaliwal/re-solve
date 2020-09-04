import React, { useEffect, useContext} from 'react';
import createContext from '../createContext';


export default function GamesList(props) {
  const context = useContext(createContext);
  useEffect(()=>{
    context.setIsHost(false);
  },[]);
  let quizzes = props.quizzes;
  // console.log("quizzes --> ", props.quizzes);
  const updateGC = ((event) => { 
    context.setGameCode(event.target.value);
  })

  // const quizData = quizzes.map((quiz, index) => {
  //     return <Game
  //               key={quiz.id}
  //               id={quiz.id}
  //               user={quiz.user_id}
  //               gamertag = {quiz.player_gamertag}
  //               name={quiz.quiz_name}
  //               num_of_questions={quiz.num_of_questions}
  //               difficulty={quiz.difficulty}
  //               rating={quiz.rating}
  //               num_of_times_hosted={quiz.num_of_times_hosted}
  //               total_players_played={quiz.total_players_played}
  //               category={quiz.category_name}
  //             />
  //   })

  return (
    <section>
      <div>
        <h4>Join page</h4>
        <form>
          <input type="text" placeholder="Enter game code to join..." onChange={updateGC}/>
          <button type="button" onClick={()=>{
            context.joinButton(context.gameCode);
          }}>
            Join
          </button>
        </form>
        {/* <h4>{quizData}</h4> */}
      </div>
    </section>
  );
}