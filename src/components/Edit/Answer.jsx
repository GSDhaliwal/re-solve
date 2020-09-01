import React from 'react';

export default function Answer(props){
  const { id, question } = props;

  
  const updatePartialAnswer = function(id, event) {
    const answers = question.answers;
    answers[id].text = event.target.value;
    const newSelf = {
      ...question,
      answers: answers,
    }
    props.onChange(newSelf)
  }

   const updatePartialAnswerBoolean = function(id, event) {
    const answers = question.answers;
    answers[id].correct = Boolean(event.target.checked);
    const newSelf = {
      ...question,
      answers: answers,
    }
    props.onChange(newSelf)
  }


  if (!question.answers || !question.answers[id]) {
    return null;
  }

  return (

    <div className="answers">
      <br/>
      <input type="text" name="Answers" id={id} value={question.answers[id].text} onChange={event => updatePartialAnswer(id, event)} />
      <input type="checkbox" name="Answers" id={"checkbox"+id} checked={question.answers[id].correct} onChange={event => updatePartialAnswerBoolean(id, event)} />
      <br/>
    </div>
  )

}