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
    console.log("inside gamelist quizlist:", context.quizlist);

  },[]);
  console.log("quizzes --> ", props.quizzes);


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
    console.log("ref??", selectRef.current);
    console.log("quiz???", page);
  }
  const handleSort= (event) => {
    selectRef.current = Number(event.target.value);
    setOrder(Number(event.target.value));
    reSort(context.quizlist, selectRef.current);
    console.log("in on change", page);
    console.log("type?", typeof order);
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
      <div>
        <h4>host page</h4>
        <button type='button' onClick={handleClick}>
          Back
        </button>

         Sort by:
        <select  ref={selectRef} value={order} onChange={handleSort}>
        <option value={1}>Category</option>
        <option value={2}>Difficulty</option>
        <option value={3}>Total Players Played</option>
        <option value={4}>Most Played</option>
        <option value={5}>Least Questions</option>
        <option value={6}>Most Questions</option>
        </select>
        <div className="card">
        <h4>{display(page)}</h4>
        </div>
      </div>
    // </section>
  );
}