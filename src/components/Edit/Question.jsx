import React, { useState } from 'react';
import Answer from './Answer';

const mergeDefaultAnswers = function (answers) {
  const defaultAnswer = [
    { text: '', correct: false},
    { text: '', correct: false},
    { text: '', correct: false},
    { text: '', correct: false},
    { text: '', correct: false},
  ]
  answers.forEach((answer, index) => {
    defaultAnswer[index] = {...answer}
  })
  return defaultAnswer;
}

export default function Question(props) {
  const { id, index, question } = props;
  const existingAnswers = mergeDefaultAnswers(question.answers)
  const [answers, setAnswers] = useState(existingAnswers);
  
  question.answers = answers;
  let display = answers.map((answer, index) => {
    if (index < 5) {
      return <Answer
        key={index}
        id={index}
        question={question}
        onChange={props.onChange}
      />
    }
  })

  //when called, updates question based on property being changed
  const updatePartialQuestion = function(partName, event) {
    const newSelf = {
      ...question,
      [partName]: event.target.value
    }
    props.onChange(newSelf)
  }

  const updatePartialQuestionImage = function(partName, event) {
    const newSelf = {
      ...question,
      [partName]: event.target.files[0]
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
        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" value={question.img_url} onChange={event => updatePartialQuestionImage('img_url', event)} />
        <br/>
        <br/>
        Points Awarded:
          <select value={question.points} onChange={event => updatePartialQuestion('points', event)}>
            <option value="125">125</option>
            <option value="250">250</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
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