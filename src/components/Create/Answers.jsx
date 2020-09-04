import React from 'react';

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
      <br/>
      {id + 1}:
      <input type="text" name="Answers" id={id} value={question.answers[id].answer} onChange={event => updatePartialAnswer(id, event)} />
      <input type="checkbox" name="Answers" id={"checkbox"+id} value={question.answers[id].correct_answer} onChange={event => updatePartialAnswerBoolean(id, event)} />
      <br/>
    </div>
  )

}