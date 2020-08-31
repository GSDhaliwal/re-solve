import React, { useState, useEffect } from 'react';
import Questions from './Questions';

function randomId() {
  return Math.random().toString().slice(2, 10);
}



export default function Create(props){
  const [questions, setQuestions] = useState([]);
  
  
  useEffect(() => {
    console.log(questions)
  })

  const addQuestion = function() {
    let id = randomId();
    setQuestions([...questions, {
      id,
      q_text: '',
      img_url: null,
      points: 125,
      answers: [
        { text: '', correct: false},
        { text: '', correct: false},
      ],
      solve_time: 20,
    }])  
  };

  //only deletes the last question
  const deleteQuestion = function(index) {
    console.log("time to delete a question, how about index = ", index);
    const spliceQuestionsArray = [...questions] 
    spliceQuestionsArray.splice(index, 1)
    setQuestions(spliceQuestionsArray)
  };

  const updateQuestion = function(index, newQuestion) {
    // figure out how to replace the CORRECT element, and leave all others alone, 
    //    and that will let you make a call to setQuestions();

    // BEFORE
    //   questions:  [{id: 245}, {id: 764}]
    //   id: 245
    //   newQuestion: {id: 245, q_text: 'hello' }
  
    // AFTER
    //   questions: [{id: 245, q_text: 'hello' }, {id: 764}]


    
    // BEFORE
    //   questions:  [{id: 245}, {id: 764}]
    //   index: 0
    //   newQuestion: {id: 245, q_text: 'hello' }
  
    // AFTER
    //   questions: [{id: 245, q_text: 'hello' }, {id: 764}]


    //  o1 = {a: 1, b: 2, c: 3}
    //  o2 = {...o1, b:4}
    //  o2 = {a: 1, b: 2, c: 3, b: 4}
    //  o2 = {a: 1, c: 3, b: 4}

    //  a1 = [5, 6, 7]
    //  a2 = [...a1, 11]
    //  a2 = [5, 6, 7, 11]

    let clonedQuestions = [...questions];
    clonedQuestions[index] = newQuestion;
    setQuestions(clonedQuestions);

    
    // setQuestions([...questions, questions[id].q_text = newQuestion])
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
      <button type="button">Save Draft</button>
      <input type="submit" value="Save/Post" />
   </form>
  )
}

