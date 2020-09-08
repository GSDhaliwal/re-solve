import React from 'react';
import { Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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
      <input type="text" name="Answers" placeholder="Answer" id={id} value={question.answers[id].answer} onChange={event => updatePartialAnswer(id, event)} />
      <input type="checkbox" name="Answers" id={"checkbox"+id} value={question.answers[id].correct_answer} onChange={event => updatePartialAnswerBoolean(id, event)} />
      <br/>
    </div>
  )

}