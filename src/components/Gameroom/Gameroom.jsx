import React,{useState, useEffect} from "react";
import RankingList from "./RankingList";
import Questions from "./Question"


export default function Gameroom(props){
// const [view, setView] = useState(0);
//   let max = 10;
  // while(view < max){
  // setInterval(()=>{
  //   console.log(view);
  //   setView((cv)=>{
  //     return cv+1;
  //   })
  // }, 3000); 
    
  // }
  

    console.log("beep");
    // <RankingList
    // key={props.round}
    // players={props.players}
    // round={props.round}
    // users={props.users}
    // />
    // <Questions
    // key={props.round+1}
    // question={props.question}
    // answers={props.answers}
    // />

  return(
    <section>
    <RankingList
      key={props.round}
      players={props.players}
      round={props.round}
      users={props.users}
    />
    <Questions
    key={props.round+1}
    question={props.questions[1]}
    answers={props.answers}
    />
    </section>
  )
}