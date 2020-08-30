import React from 'react';
import Answer from "./Answer";

export default function Question(props){
  let answers = props.answers.map((answer, index)=>{
    return <Answer 
      key = {index}
      prefix = {index+1}
      content = {answer.content}
      correct = {answer.correct}
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