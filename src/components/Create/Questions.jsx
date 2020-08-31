import React, { useState, useEffect } from 'react';
import Answers from './Answers';

export default function Questions(props) {
  const { id, index, question } = props;

  const [answers, setAnswers] = useState([1, 1]);
  

  const addAnswer = function() {
    if(answers.length < 5) {
      setAnswers([...answers, 1])
    }
  };

  const deleteAnswer = function() {
    if(answers.length > 2) {
      setAnswers([...answers.slice(0, -1)])
    }
   };
  
  let display = answers.map((answer, index) => {
    if (index < 5) {
      return <Answers 
        key={index}
        id={index} 
      />
    }
  })

  const updatePartialQuestion = function(partName, event) {
    const newSelf = {
      ...question,
      [partName]: event.target.value,     // Jeremy is not 100% sure this is 100%
    }
    console.log("new question:", newSelf)
    props.onChange(newSelf)
  }
  



  
  return (
    <div className="questions">
      <h3>Q{index + 1}</h3>
        Question:
          <input type="text" name="Question" id={id} value={question.q_text} onChange={event => updatePartialQuestion('q_text', event)}/>
        <br/>
        <br/>
        <button type="button">Add Image</button>
        <br/>
        <br/>
        Points Awarded:
          <select>
            <option value="125">125</option>
            <option value="250">250</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>
        <br/>
        <br/>
        Seconds to solve:
          <input type="text" name="seconds" />
        <br/>
        <br/>
        Answers:
          {display}
        <br/>
        <button type="button" onClick={addAnswer}>Add Answer</button>
        <button type="button" onClick={deleteAnswer}>Delete Answer</button>
        <br/>
        <button type="button" onClick={ props.onDelete }>Delete Question</button>
        <br/>
        
    </div>
  
  )
}