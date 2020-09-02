import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import Answer from "./components/Answer";
import Question from "./components/Question";
import GamesList from "./components/host_games_list/GamesList";
import UserContext from "./components/UserContext";

// const base = io('/');

// const fQuestions = "what is 1+1?";
// const fanswers = [{content: "2", correct: true}, {content: "3", correct: false}, {content:"4", correct: false}];

// const quizzes = [
//   {id: 1, category_id: 1, user_id: 1, quiz_name: "Middle Earth", num_of_questions: 5, difficulty: 9.8, rating: 7, num_of_times_hosted: 10, total_players_played: 200},
//   {id: 2, category_id: 1, user_id: 2, quiz_name: "Star Wars", num_of_questions: 5, difficulty: 5.5, rating: 7, num_of_times_hosted: 10, total_players_played: 200},
//   {id: 3, category_id: 2, user_id: 3, quiz_name: "Harry Potter", num_of_questions: 5, difficulty: 1.5, rating: 7, num_of_times_hosted: 10, total_players_played: 200},
//   {id: 4, category_id: 1, user_id: 4, quiz_name: "Star Trek", num_of_questions: 5, difficulty: 4, rating: 7, num_of_times_hosted: 10, total_players_played: 200},
//   {id: 5, category_id: 2, user_id: 5, quiz_name: "Azeroth", num_of_questions: 5, difficulty: 8, rating: 7, num_of_times_hosted: 10, total_players_played: 200},
//   {id: 6, category_id: 1, user_id: 6, quiz_name: "Lego Universe", num_of_questions: 5, difficulty: 7.5, rating: 7, num_of_times_hosted: 10, total_players_played: 200},
//   {id: 7, category_id: 3, user_id: 7, quiz_name: "Castle Peach", num_of_questions: 5, difficulty: 4.4, rating: 7, num_of_times_hosted: 10, total_players_played: 200},
//   {id: 8, category_id: 3, user_id: 8, quiz_name: "Rob's Appartment", num_of_questions: 5, difficulty: 7.2, rating: 7, num_of_times_hosted: 10, total_players_played: 200}
// ];

// const categories = [
//   {id:1, category_name: "Math"},
//   {id:2, category_name: "History"},
//   {id:3, category_name: "Code"}
// ];

export default function App() {

  const [quiz, setQuiz] = useState({});
  const [category, setCategory] = useState({});
  const [user, setUser] = useState({});
  const [initilizedQuiz, setInitializedQuiz] = useState(false);
  const [initilizedCategory, setInitializedCategory] = useState(false);

  const socket = io('http://localhost:8080');
  
  let message;
  // socket.on('gameslist', (data=>{
  //   setState(data);
  // }));

  

  socket.on('gameslist', (data=>{
    setQuiz(data);
    setInitializedQuiz(true);
  }));

  // socket.on('gameslistQuizzes', (data=>{
  //   setQuiz(data);
  //   setInitializedQuiz(true);
  // }));
  // socket.on('gameslistCategories', (data=>{
  //   setCategory(data);
  //   setInitializedCategory(true);
  // }));
  
  useEffect(() =>{
    console.log("logging quiz: ", quiz);
    // console.log("logging category: ", category);
  },[quiz]);

  useEffect(()=>{
    setUser({name: "KyloRen", password: "123"});
  },[]);

  useEffect (() => {
    socket.emit('hostGames', '1');
    console.log("log after socket emit - hostGames");

  },[]);






  if (!initilizedQuiz && !initilizedCategory) {
    return null;
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
        onClick = {()=>{
          socket.emit("message", "look here bitch");
          console.log(message + " and " + socket.id);
        }}
        >
          TEST
        </button>
        {/* <UserContext.Provider value = {{state, user}}> */}
          <GamesList
            // quizzes={state}
            quizzes={quiz}
            // categories={category}
          />
        {/* </UserContext.Provider> */}
      </header>
    </div>
  )
}
