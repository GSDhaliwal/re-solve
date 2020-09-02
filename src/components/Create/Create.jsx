import React, { useState, useEffect, useContext } from 'react';
import Questions from './Questions';
import createdContext from './createdContext';


export default function Create(props){

  const context = useContext(createdContext);
  const [stateCategory, setStateCategory] = useState({value: 'Math'});
  const [difficulty, setDifficulty] = useState({value: '1'});
  const [GameTitle, setGameTitle] = useState();
  const [count,setCount] = useState(1);
  const [questions, setQuestions] = useState([{
    id: 0,
    q_text: '',
    img_url: '',
    points: 125,
    solve_time: 20,
    answers: [
      { text: '', correct: false},
      { text: '', correct: false},
      { text: '', correct: false},
      { text: '', correct: false},
      { text: '', correct: false},
    ],
  }]);
  
  
  useEffect(() => {
    console.log(questions)
  })

  const addQuestion = function(id) {
    console.log("inside add",id);
    setCount(count+1);
    setQuestions([...questions, {
      id,
      q_text: '',
      img_url: '',
      points: 125,
      solve_time: 20,
      answers: [
        { text: '', correct: false},
        { text: '', correct: false},
        { text: '', correct: false},
        { text: '', correct: false},
        { text: '', correct: false},
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
 

  return (
    <form>
      <label>
        Game Title:
        <input type="text" onChange={updateGameTitle} />
        <br/>
        <br/>
        Category:
        <select value={stateCategory.value} onChange={handleChangeCategory}>
          { props.categories.map(category => {
            return ( 
              <option value={category.categories_name} key={category.categories_name}>
              {category.categories_name}
              </option>
            )
          }) }
        </select>
        Difficulty:
        <select value={difficulty.value} onChange={handleChangeDifficulty}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      {display}
      <br/>
      <button type="button" onClick={()=>{
        addQuestion(count)
        console.log("count on buttonclick",count);
        }}>Add Question</button>
      <br/>
      <br/>
      <button
        type="button"  
        onClick={()=>{context.createQuiz(GameTitle, stateCategory.value, questions, questions.length, parseInt(difficulty.value))}}>
          Save/Post Quiz       
      </button>
   </form>
  )
}

