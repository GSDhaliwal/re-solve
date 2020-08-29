import React from 'react';

export default function Answer(props){
  return <button onClick={(()=>{
    console.log("clicked", props.correct);
  })}>
      {props.prefix}
      {". "}
      {props.content}
    </button>;
}