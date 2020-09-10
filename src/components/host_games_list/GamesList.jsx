import React, { useEffect, useContext, useState, useRef} from 'react';
import Game from './Game';
import createContext from '../createContext';
import './gameslist.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


export default function GamesList(props) {
  const [order, setOrder] = useState(1);
  const context = useContext(createContext);
  const [page, setPage] = useState(context.quizlist);

  let selectRef = useRef();
  useEffect(()=>{
    context.setIsHost(true);
  },[]);


  //back button functionality
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }


  // let quizData;
  let sorted = context.quizlist;
  

  const reSort = (quizzes, order)=>{
    if(order === 1){
      sorted = quizzes.sort((a, b)=>{
        if(b.category_id > a.category_id){
          return -1;
        }
        if(b.category_id < a.category_id){
          return 1;
        }
        if(b.category_id === a.category_id){
          return 0;
        }
      })
    }
    if(order === 2){
      sorted = quizzes.sort((a, b)=>{
        if(b.difficulty > a.difficulty){
          return -1;
        }
        if(b.difficulty < a.difficulty){
          return 1;
        }
        if(b.difficulty === a.difficulty){
          return 0;
        }
      })
    }
    if(order === 3){
      sorted = quizzes.sort((a, b)=>{
        if(a.total_players_played > b.total_players_played){
          return -1;
        }
        if(a.total_players_played < b.total_players_played){
          return 1;
        }
        if(a.total_players_played === b.total_players_played){
          return 0;
        }
      })
    }
      if(order === 4){
        sorted = quizzes.sort((a, b)=>{
          if(a.num_of_times_hosted > b.num_of_times_hosted){
            return -1;
          }
          if(a.num_of_times_hosted < b.num_of_times_hosted){
            return 1;
          }
          if(a.num_of_times_hosted === b.num_of_times_hosted){
            return 0;
          }
        })
      } 
      if(order === 5){
        sorted = quizzes.sort((a, b)=>{
          if(b.num_of_questions > a.num_of_questions){
            return -1;
          }
          if(b.num_of_questions < a.num_of_questions){
            return 1;
          }
          if(b.num_of_questions === a.num_of_questions){
            return 0;
          }
      })
    }
    if(order === 6){
      sorted = quizzes.sort((a, b)=>{
        if(a.num_of_questions > b.num_of_questions){
          return -1;
        }
        if(a.num_of_questions < b.num_of_questions){
          return 1;
        }
        if(a.num_of_questions === b.num_of_questions){
          return 0;
        }
    })
  }
    setPage(sorted);
  }
  const handleSort= (event) => {
    selectRef.current = Number(event.target.value);
    setOrder(Number(event.target.value));
    reSort(context.quizlist, selectRef.current);
  }
  const display = (page)=>{
    return page.map((quiz, index) => {
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
  }


  return (
    // <section>
      <div className="gamesList">
        <button className="backButton" type='button' onClick={handleClick}>
        </button>
      
        <h4 className="host-title">Hosting</h4>
        <span className="sorting">
         sort by:
        <select  className="sortSelect"ref={selectRef} value={order} onChange={handleSort}>
        <option value={1}>Category</option>
        <option value={2}>Difficulty</option>
        <option value={3}>Total Players Played</option>
        <option value={4}>Most Played</option>
        <option value={5}>Least Questions</option>
        <option value={6}>Most Questions</option>
        </select>
        </span>
        <div className="card">
        {display(page)}
        </div>
      </div>
    // </section>
  );
}