import React, { useState, useEffect, useContext } from 'react';
import Questions from './Questions';

import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

import "./Create.css";

import createContext from '../createContext';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


const categories = ['Arts', 'General', 'Math', 'Science', 'Software']

export default function Create(props){
  
  const context = useContext(createContext);
  const [stateCategory, setStateCategory] = useState({value: 'Math'});
  const [difficulty, setDifficulty] = useState({value: '1'});
  const [gameTitle, setGameTitle] = useState();
  const [count,setCount] = useState(1);
  const [questions, setQuestions] = useState([{
    id: 0,
    question: '',
    image: '',
    points_per_question: 125,
    time_per_question: 20,
    answers: [
      { answer: '', correct_answer: false},
      { answer: '', correct_answer: false},
      { answer: '', correct_answer: false},
      { answer: '', correct_answer: false},
      { answer: '', correct_answer: false}
    ],
  }]);
  
  


  const addQuestion = function(id) {
    setCount(count+1);
    setQuestions([...questions, {
      id,
      question: '',
      image: '',
      points_per_question: 125,
      time_per_question: 20,
      answers: [
        { answer: '', correct_answer: false},
        { answer: '', correct_answer: false},
        { answer: '', correct_answer: false},
        { answer: '', correct_answer: false},
        { answer: '', correct_answer: false}
      ],
    }]) 

  };

 
  const deleteQuestion = function(index) {
    console.log("time to delete a question, how about index = ", index);
    let temp=[];
    questions.map((question)=>{
      if(question.id !== index){
        temp.push(question);
      }
    })
    setQuestions(temp);
  };


  const updateQuestion = function(index, newQuestion) {
   let clonedQuestions = [...questions];
    clonedQuestions[index] = newQuestion;
    setQuestions(clonedQuestions);
  };
  
  let display = questions.map((question, index) => {
      return <Questions 
        key={question.id}
        id={question.id}
        question={question}
        index={index}
        onDelete={() => {
          deleteQuestion(index)
        }}
        onChange={newQuestion => {
          updateQuestion(index, newQuestion)
        }}
      />
  })

  const handleChangeCategory = (event) => {
    setStateCategory({value: event.target.value});
  }

  const handleChangeDifficulty = (event) => {
    setDifficulty({value: event.target.value});
  }

  const updateGameTitle = (event)=>{
    setGameTitle(event.target.value);
  }

  //back button functionality
  let history = useHistory();
  function handleClick() {
    history.push("/");
  }

  const doesUserExist = () => {
    if (context.user) { 
      return context.createQuiz(gameTitle, stateCategory.value, questions, questions.length, parseInt(difficulty.value), context.user.username)
    } else {
      return context.createQuiz(gameTitle, stateCategory.value, questions, questions.length, parseInt(difficulty.value))
    }
  }
 

  return (
    <div className="createForm">
    <form className="create">
      <div>
        <button type='button' onClick={handleClick}>
          Back
        </button>
      </div>
      <div className="initialQuizInfo">
        <div className="QuizTitle">
          <label id="title">Quiz Title</label>
          <textarea className="titleTextArea" name="QuizTitle" placeholder="Quiz Title"onChange={updateGameTitle} />
          
        </div>
        <div class="categoryAndDifficulty">
          <FormControl component="fieldset">
            <FormLabel id="title" component="legend">Category</FormLabel>
            <RadioGroup aria-label="category" name="categroy1" value={stateCategory.value} onChange={handleChangeCategory}>
            { categories.map(category => {
              return ( 
                <FormControlLabel value={category} control={<Radio />} key={category} label={category} />
              )
            })}
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel id="title" component="legend">Difficulty</FormLabel>
            <RadioGroup aria-label="difficulty" name="difficulty1" value={difficulty.value} onChange={handleChangeDifficulty}>
              <FormControlLabel value="1" control={<Radio />} label="1" />
              <FormControlLabel value="2" control={<Radio />} label="2" />
              <FormControlLabel value="3" control={<Radio />} label="3" />
              <FormControlLabel value="4" control={<Radio />} label="4" />
              <FormControlLabel value="5" control={<Radio />} label="5" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="questionalignment">
        {display}
      </div>
      <button type="button" onClick={()=>{
        addQuestion(count)
        console.log("count on buttonclick",count);
        }}>Add Question</button>
      <button 
      type="button"
        onClick={()=>{doesUserExist()
         handleClick()}}>
          Save/Post Quiz       
      </button>
   </form>
   </div>
  )
}

