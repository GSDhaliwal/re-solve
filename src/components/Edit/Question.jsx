import React, { useState } from 'react';
import Answer from './Answer';
import "../CreateAndEditCSS/Questions.css";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

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

  const updatePartialQuestionPoints = function(partName, event) {
    const newSelf = {
      ...question,
      [partName]: Number(event.target.value)
    }
    props.onChange(newSelf)
  }


  
  return (
    <div className="questions">
        
    <label>Question</label>
    <br/>
    <br/>
    <textarea className="questionTextArea" type="text" placeholder="Type Here..." name="Question" id={id} value={question.question} onChange={event => updatePartialQuestion('question', event)}/>
  <div className="ImagePointsAndSeconds">
    <div className="ImageAndSeconds">
      <label className="URL" for="picture">Image</label>
      <input className="image" type="text" placeholder="URL"id="picture" name="picture" value={question.image} onChange={event => updatePartialQuestion('image', event)} />
      <label className="seconds" for="seconds">Seconds to solve</label>
      <input className="secondsNumber" type="text" name="seconds" value={question.time_per_question} onChange={event => updatePartialQuestion('time_per_question', event)}/>
    </div>
    <div className="points">
      <FormControl component="fieldset">
      <FormLabel id="title" component="legend">Points Awarded</FormLabel>
      <RadioGroup aria-label="difficulty" name="difficulty1" value={(question.points_per_question).toString()} onChange={event => updatePartialQuestionPoints('points_per_question', event)}>
        <FormControlLabel value="125" control={<Radio />} label="125" />
        <FormControlLabel value="250" control={<Radio />} label="250" />
        <FormControlLabel value="500" control={<Radio />} label="500" />
      </RadioGroup>
      </FormControl>
    </div>
  </div>
  <label for="Answers">Answers</label>
    {display}
  <button className="button-delete" type="button" onClick={ props.onDelete }>Delete Question</button>
</div>
  
  )
}