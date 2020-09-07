import React, { useState } from 'react';
import Answer from './Answer';

const mergeDefaultAnswers = function (answers) {
  const defaultAnswer = [
    { answer: '', correct_answer: false },
    { answer: '', correct_answer: false },
    { answer: '', correct_answer: false },
    { answer: '', correct_answer: false },
    { answer: '', correct_answer: false }
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
  //console.log('fffffffffffffff', question.answers)
  
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

  
  return (
    <div className="questions">
      <h3>Q{index + 1}</h3>
        Question:
          <input type="text" name="Question" id={id} value={question.question} onChange={event => updatePartialQuestion('question', event)}/>
        <br/>
        <br/>
        Image:
        <input type="text" id="picture" name="picture" value={question.image} onChange={event => updatePartialQuestion('image', event)} />
        <br/>
        <br/>
        Points Awarded:
          <select value={question.points_per_question} onChange={event => updatePartialQuestion('points_per_question', event)}>
            <option value="125">125</option>
            <option value="250">250</option>
            <option value="500">500</option>
          </select>
        <br/>
        <br/>
        Seconds to solve:
          <input type="text" name="seconds" value={question.time_per_question} onChange={event => updatePartialQuestion('time_per_question', event)}/>
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