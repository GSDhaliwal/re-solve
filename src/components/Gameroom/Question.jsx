import React, { useEffect, useContext } from 'react';
import Answer from "./Answer";
import UserContext from './UserContext';

export default function Question(props){
  const context = useContext(UserContext);
  useEffect(()=>{
    context.setAnswered(false);
    console.log("answers:", props.answers);
  },[]);

  let answers = props.answers.map((answer, index)=>{
    return (context.whichAns !== index && context.answered === true) ? "": (<Answer 
      key = {index}
      index = {index}
      content = {answer.answer}
      correct = {answer.correct_answer}
      score = {props.score}
    />)
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