import React, { useState, useEffect, useContext } from 'react';
import Question from './Question';
import createContext from '../createContext';
import "../Create/Create.css";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import "../back_button.css";

const categories = ['Arts', 'General', 'Math', 'Science', 'Software']

export default function Edit(props){
  const context = useContext(createContext);
  useEffect(() => {
    console.log("context inside ", context.title[0]);
  }, [])
  const [state, setState] = useState(categories);
  const [stateCategory, setStateCategory] = useState({value: context.title[0].category_name});
  const [difficulty, setDifficulty] = useState({value: (context.title[0].difficulty).toString()});
  const [gameTitle, setGameTitle] = useState({value: context.title[0].quiz_name});
  const [questions, setQuestions] = useState(context.quiz.QA);
  const [count, setCount] = useState(questions.length);
  useEffect(() => {
    console.log("1", questions);
    console.log("2", gameTitle);
    console.log("3", typeof difficulty.value);
    console.log("4", stateCategory);
    console.log("5", count)
  })
  const addQuestion = function() {
    setCount(count+1);
    setQuestions([...questions, {
      id: count,
      question: '',
      image: '',
      points_per_question: 125,
      time_per_question: 20,
      answers: [
        { answer: '', correct_answer: false },
        { answer: '', correct_answer: false },
        { answer: '', correct_answer: false },
        { answer: '', correct_answer: false },
        { answer: '', correct_answer: false }
      ],
    }])  
  };
  const deleteQuestion = function(index) {
    let temp=[];
    let current = 0;
    questions.map((question)=>{
      if((current) !== index){
        temp.push(question);
      }
      current++;
    })
    setQuestions(temp);
  };

  const updateQuestion = function(index, newQuestion) {
   let clonedQuestions = [...questions];
    clonedQuestions[index] = newQuestion;
    setQuestions(clonedQuestions);
  };

  const handleChangeCategory = (event) => {
    setStateCategory({value: event.target.value});
  };

  const handleChangeDifficulty = (event) => {
    setDifficulty({value: event.target.value});
  };
  const updateGameTitle = (event)=>{
    setGameTitle({value: event.target.value});
  };
    let display = questions.map((question, index) => {
        return <Question 
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

  

  return (
    <div>
    <form className="create">
    <div className="initialQuizInfo">
        <div className="QuizTitle">
          <label id="title">Quiz Title</label>
          <textarea className="titleTextArea" name="QuizTitle" placeholder="Quiz Title" value={gameTitle.value} onChange={updateGameTitle} />
          
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
      <button className="button" type="button" onClick={addQuestion}>Add Question</button>
      <br/>
      <button
      className="button"
      type="button"
        onClick={()=>{context.editQuiz(gameTitle.value, stateCategory.value, questions, questions.length, parseInt(difficulty.value), context.quiz.id, context.username)}}>
          Save/Post Quiz       
      </button>
      <button type="button" className="backButton" onClick={()=>{
        context.setClicked(false);
        context.loadProfilePage(context.user);
      }}>
      </button>
   </form>
   </div>
  )
}

