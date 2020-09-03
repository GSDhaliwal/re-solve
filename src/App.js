import React, { useState, useEffect, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import Answer from "./components/Answer";
import Question from "./components/Question";
import Create from "./components/Create/Create";
import Edit from "./components/Edit/Edit";
import createdContext from "./components/Create/createdContext";
import editedContext from "./components/Create/createdContext";


// const base = io('/');


export default function App() {
  const context = useContext(createdContext);
  
  const [quiz, setQuiz] = useState();
  const [title, setTitle] = useState();
  const [clicked, setClicked] = useState(false);
  const socket = io('http://localhost:8080');
  let message;

  useEffect(() => {
    socket.on('message', (msg=>{
      message = msg;
    }));
    
  }, [])

  const createQuiz = (gameTitle, category, questions, numOfQuestions, difficulty)=>{
    socket.emit('createdQuiz', {gameTitle, category, questions, numOfQuestions, difficulty});
  }

  const editQuiz = (gameTitle, category, questions, numOfQuestions, difficulty, oldQuizId)=>{
    socket.emit('editedQuiz', {gameTitle, category, questions, numOfQuestions, difficulty, oldQuizId});
  }
  
  
  const bar = () => {
    socket.emit('quizToEdit', '24');
    socket.once('editThisQuiz', (questions => {
      const questionsArray = questions.map((question, index) => {
        const container = {};
        container.id = index;
        container.question = question.question;
        container.image = question.image;
        container.points_per_question = question.points_per_question;
        container.time_per_question = question.time_per_question;
        container.answers = question.answers;
        container.created_quiz_id = question.created_quiz_id;
        return container;
      })
      setQuiz(questionsArray);
      setClicked(true);
    }))
    socket.once('editThisQuizTitle', (res => {
      setTitle(res);
    }))
  }

  const clickfunc = () => {
    
    bar();
  }


  //original <---
  // const bar = (setQuiz, setTitle)=>{
  //   socket.emit('quizToEdit', '12');
  //   socket.once('editThisQuiz', (res => {
  //     console.log("Q", res)
  //     setQuiz(res);
  //   }))
  //   socket.once('editThisQuizTitle', (res => {
  //     console.log("T", res)
  //     setTitle(res);
  //   }))
  // }

  // const clickfunc =()=>{
  //   setClicked(true);
  //   bar();
  // }

  
    // socket.emit('quizToEdit', '12');

    // useEffect(() => {
    //   socket.once('editThisQuiz', (res => {
    //     console.log("Q", res)
    //     setQuiz(res);
    //     setInitialized(true);
    //   }))
    //   socket.once('editThisQuizTitle', (res => {
    //     console.log("T", res)
    //     setTitle(res);
    //   }))
    // }, []);


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
        {
          <createdContext.Provider value = {{editQuiz, quiz, setQuiz, title, 
          setTitle, clickfunc, bar}}>
          { clicked ? <Edit />
          : <button onClick ={()=>{
            bar();
          }}>
            EDIT
            </button>
          }  
          </createdContext.Provider>}
        { /*
        <createdContext.Provider value = {{createQuiz}}>
        <Create 
        />
        </createdContext.Provider> */}
        {/* <Question
          key={1}
          question={fQuestions}
          answers={fanswers}
        /> */}
      </header>
    </div>
  )
}
