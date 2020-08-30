import React from 'react';

export default function Answers(props){

  return (
    <div className="answers">
      <br/>
      {props.id + 1}:
      <input type="text" name={props.id + 1}/>
      <input type="checkbox" id={props.id + 1} name={props.id + 1} />
      <br/>
    </div>
  )

}