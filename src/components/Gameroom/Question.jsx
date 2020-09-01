import React from 'react';
import Answer from "./Answer";

export default function Question(props){
  let answers = props.answers.map((answer, index)=>{
    return <Answer 
      key = {index}
      content = {answer.answer}
      correct = {answer.correct_answer}
    />
  })
  return (
    <section>
      <h2>
        {props.question.question}
      </h2>
      {answers}
    </section>
  )
}