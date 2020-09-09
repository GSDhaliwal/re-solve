import React, { useEffect, useContext } from 'react';
import Answer from "./Answer";
import UserContext from './UserContext';
import "./Question.css"

export default function Question(props){
  const context = useContext(UserContext);
  useEffect(()=>{
    context.setAnswered(false);
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
    <section className="Question">
      <h6 className="qTitle">
        {props.question.question}
      </h6>
      <div>
      {(props.question.image.length > 0) ? <img className="qimage"src={props.question.image}/> : ""}
      </div>
      <div className="Answers">
        {answers}
      </div>
    </section>
  )
}