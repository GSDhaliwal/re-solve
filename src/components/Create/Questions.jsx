import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Answers from './Answers';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import "./Create.css";
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

  const updatePartialQuestionPoints = function(partName, event) {
    const newSelf = {
      ...question,
      [partName]: Number(event.target.value)
    }
    props.onChange(newSelf)
  }


  
  return (
    <div className="questions">
        
        <label for="Question">Question</label>
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
      <button type="button" onClick={ props.onDelete }>Delete Question</button>
    </div>
  
  )
}