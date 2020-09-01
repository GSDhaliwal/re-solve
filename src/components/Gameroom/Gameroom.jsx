import React,{useState, useEffect, useContext} from "react";
import RankingList from "./RankingList";
import Questions from "./Question"
import UserContext from "./UserContext"


export default function Gameroom(props){
  const [view, setView] = useState();
  const [count, setcount] = useState(0);
  const context = useContext(UserContext);
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
    console.log(context.user);
  },[context.user]);
    useEffect(()=>{
      let delay = 0;
      if(count < Object.keys(props.questions).length*2){
        if(count%2){
          delay = props.questions[ Math.floor(count/2)].time_per_question*1000;
          setTimeout(() => {
            setView(<RankingList
              key={props.questions[Math.floor(count/2)].id}
              players={props.players}
              user={context.user}
            />)
            console.log("r");
            setcount(count+1);
          }, delay);
        }else{
          delay = 1500;
          setTimeout(() => {
            setView(<Questions
              key={props.questions[Math.floor(count/2)].id}
              question={props.questions[ Math.floor(count/2)]}
              answers={props.questions[ Math.floor(count/2)].answers}
              user={context.user}
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