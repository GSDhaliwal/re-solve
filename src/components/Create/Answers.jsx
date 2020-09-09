import React from 'react';
import { Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import "../CreateAndEditCSS/Answers.css";
export default function Answers(props){
  const { id, question } = props;

  const updatePartialAnswer = function(id, event) {
    const answers = question.answers;
    answers[id].answer = event.target.value;
    const newSelf = {
      ...question,
      answers: answers,
    }
    props.onChange(newSelf)
  }

   const updatePartialAnswerBoolean = function(id, event) {
    const answers = question.answers;
    answers[id].correct_answer = Boolean(event.target.checked);
    const newSelf = {
      ...question,
      answers: answers,
    }
    props.onChange(newSelf)
  }

  
  
  return (

    <div className="answers">
      <input className="answerInput" type="text" name="Answers" placeholder="Check if correct" id={id} value={question.answers[id].answer} onChange={event => updatePartialAnswer(id, event)} />
      <input className="cbes" type="checkbox" name="Answers" id={"checkbox"+id} value={question.answers[id].correct_answer} onChange={event => updatePartialAnswerBoolean(id, event)} />
      <br/>
    </div>
  )

}