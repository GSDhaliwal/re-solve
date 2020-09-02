import React, { useState, useEffect } from 'react';
import Answers from './Answers';

export default function Questions(props) {
  const { id, index, question } = props;

  const [answers, setAnswers] = useState([1, 1, 1, 1, 1]);
  
  
  let display = answers.map((answer, index) => {
    if (index < 5) {
      return <Answers 
        key={index}
        id={index}
        question={props.question}
        onChange={props.onChange}
      />
    }
  })

  //when called, updates question based on property being changed
  const updatePartialQuestion = function(partName, event) {
    const newSelf = {
      ...question,
      [partName]: event.target.value,
    }
    props.onChange(newSelf)
  }



  
  return (
    <div className="questions">
      <h3>Q{index + 1}</h3>
        Question:
          <input type="text" name="Question" id={id} value={question.q_text} onChange={event => updatePartialQuestion('q_text', event)}/>
        <br/>
        <br/>
        Image:
        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" value={question.img_url} onChange={event => updatePartialQuestion('img_url', event)} />
        <br/>
        <br/>
        Points Awarded:
          <select value={question.points} onChange={event => updatePartialQuestion('points', event)}>
            <option value="125">125</option>
            <option value="250">250</option>
            <option value="500">500</option>
          </select>
        <br/>
        <br/>
        Seconds to solve:
          <input type="text" name="seconds" value={question.solve_time} onChange={event => updatePartialQuestion('solve_time', event)}/>
        <br/>
        <br/>
        Answers:
          {display}
        <br/>
        <button type="button" onClick={ props.onDelete }>Delete Question</button>
        <br/>
      </div>
  
  )
}