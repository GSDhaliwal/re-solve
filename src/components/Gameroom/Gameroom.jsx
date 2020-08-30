import React,{useState, useEffect, useRef} from "react";
import RankingList from "./RankingList";
import Questions from "./Question"


export default function Gameroom(props){
  const [view, setView] = useState();
  // <Questions
  //   key={props.round+1}
  //   question={props.questions[1]}
  //   answers={props.questions[1].answers}
  // />
  const [count, setcount] = useState(0);
  const countRef = useRef();
  countRef.current = count;
//   let max = 10;
  // while(view < max){
  // setInterval(()=>{
  //   console.log(view);
  //   setView((cv)=>{
  //     return cv+1;
  //   })
  // }, 3000); 
  
  // }
  

    
    useEffect(()=>{
      let delay = 0;
      if(count < Object.keys(props.questions).length*2){
        if(count%2){
          delay = props.questions[ Math.floor(count/2)+1].time_per_question*1000;
        setTimeout(() => {
            setView(<RankingList
              key={props.round+2}
              players={props.players}
              round={props.round}
              users={props.users}
            />)
            console.log("r");
            setcount(count+1);
          }, delay);
        }else{
          delay = 1500;
          setTimeout(() => {
            setView(<Questions
              key={props.round+1}
              question={props.questions[ Math.floor(count/2)+1]}
              answers={props.questions[ Math.floor(count/2)+1].answers}
              />);
              console.log("q");
              setcount(count+1);
        }, delay);
        }
      }
      console.log(count);
      console.log(view);
    },[count]);
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
    {/* <RankingList
      key={props.round}
      players={props.players}
      round={props.round}
      users={props.users}
    />
     <Questions
    key={props.round+1}
    question={props.questions[1]}
    answers={props.answers}
    /> */}
  {view}
    </section>
  )
}