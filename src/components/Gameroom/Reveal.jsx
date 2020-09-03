import React from 'react';

export default function Reveal (props){
  let correct;
  for(let answer of props.answers){
    if(answer.correct_answer){
      correct = answer.answer;
    }
  }
  return (<div>
    <p>
      Correct answer is: {correct}
    </p>
  </div>)
}