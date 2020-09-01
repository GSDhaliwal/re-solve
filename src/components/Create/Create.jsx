import React, { useState, useEffect } from 'react';
import Questions from './Questions';

function randomId() {
  return Math.random().toString().slice(2, 10);
}



export default function Create(props){
  const [questions, setQuestions] = useState([{
    id: randomId(),
    q_text: '',
    img_url: '',
    points: 125,
    solve_time: 20,
    answers: [
      { text: '', correct: false},
      { text: '', correct: false},
    ],
  }]);
  
  
  useEffect(() => {
    console.log(questions)
  })

  const addQuestion = function() {
    let id = randomId();
    setQuestions([...questions, {
      id,
      q_text: '',
      img_url: '',
      points: 125,
      solve_time: 20,
      answers: [
        { text: '', correct: false},
        { text: '', correct: false},
      ],
    }])  
  };

 
  const deleteQuestion = function(index) {
    console.log("time to delete a question, how about index = ", index);
    const spliceQuestionsArray = [...questions] 
    spliceQuestionsArray.splice(index, 1)
    setQuestions(spliceQuestionsArray)
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

 
  return (
    <form>
      <label>
        Game Title:
        <input type="text" name="Game Title" />
        <br/>
        <br/>
        Category:
        <select>
          { props.categories.map(category => {
            return <option 
              value={category.categories_name}
              key={category.categories_name}
            >
              {category.categories_name}
            </option>})
          }
        </select>
      </label>
      {display}
      <br/>
      <button type="button" onClick={addQuestion}>Add Question</button>
      <br/>
      <input type="submit" value="Save/Post" />
   </form>
  )
}

