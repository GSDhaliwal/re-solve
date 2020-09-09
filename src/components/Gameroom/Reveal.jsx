import React from 'react';
import "./Reveal.css"

export default function Reveal (props){
  let correct;
  for(let answer of props.answers){
    if(answer.correct_answer){
      correct = answer.answer;
    }
  }
  return (<div>
    <h6 className="CAT">
      Correct answer
    </h6>
    <p className="CA">
      {correct}
    </p>
  </div>)
}