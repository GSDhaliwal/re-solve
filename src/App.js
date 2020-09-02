import React, { useState }from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import Answer from "./components/Answer";
import Question from "./components/Question";
import Create from "./components/Create/Create";
import Edit from "./components/Edit/Edit";
import createdContext from "./components/Create/createdContext";


// const base = io('/');

const created_quizzes = [
  {id: 1, category_id: 1, user_id: 1, quiz_name: "Middle Earth", num_of_questions: 5, difficulty: 9.8, rating: 7, num_of_times_hosted: 10, total_players_played: 200},
];

const categories = [{id:1, categories_name: 'Math'}, {id:2, categories_name: 'History'}, {id:3, categories_name: 'Code'}]

const questions = [{id:1, created_quiz_id: 1, quiz_key: 'A6D38D', question: 'what is 1 + 1?', points: 125, time_per_question: 5}, {id:2, created_quiz_id: 1, quiz_key: 'A6D38D', question: 'what is 2 + 2?', points: 125, time_per_question: 5}, {id:3, created_quiz_id: 1, quiz_key: 'A6D38D', question: 'what is 4 + 4?', points: 125, time_per_question: 5}]

const answers = [{id: 1, question_id: 1, correct_answer: false, answer: 1}, {id: 2, question_id: 1, correct_answer: true, answer: 2}, {id: 3, question_id: 1, correct_answer: false, answer: 4}, {id: 4, question_id: 2, correct_answer: true, answer: 4}, {id: 5, question_id: 2, correct_answer: false, answer: 6}, {id: 5, question_id: 3, correct_answer: false, answer: 4}, {id: 6, question_id: 3, correct_answer: false, answer: 3}, {id: 7, question_id: 3, correct_answer: false, answer: 24}, {id: 8, question_id: 3, correct_answer: false, answer: 40}, {id: 9, question_id: 3, correct_answer: true, answer: 8},]

export default function App() {

  const [state, setState] = useState({categories, created_quizzes, questions, answers});

  const socket = io('http://localhost:8080');
  let message;
  socket.on('message', (msg=>{
    message = msg;
  }));

  const foo = (GT, categories, questions)=>{
    socket.emit('createdTest', {GT, categories, questions});
  }

  return (
    <div className="App">
      <header className="App-header">
       {/*
       <button
        onClick = {()=>{
          socket.emit("message", "look here");
          console.log(message + " and " + socket.id);
        }}
        >
          TEST
      </button> */}
        {/*<Edit 
          created_quizzes={state.created_quizzes}  
          categories={state.categories}
          questions={state.questions}
          answers={state.amswers}
        />*/}
        <createdContext.Provider value = {{foo}}>
        {<Create 
          key={categories.id}
          categories={state.categories}
        />}
        </createdContext.Provider>
        {/* <Question
          key={1}
          question={fQuestions}
          answers={fanswers}
        /> */}
      </header>
    </div>
  )
}
