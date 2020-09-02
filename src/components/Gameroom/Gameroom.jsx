import React,{useState, useEffect, useContext} from "react";
import RankingList from "./RankingList";
import Questions from "./Question"
import UserContext from "./UserContext"
import Reveal from "./Reveal";


export default function Gameroom(props){
  const [view, setView] = useState();
  const [count, setcount] = useState(0);
  const context = useContext(UserContext);

  
  
  useEffect(()=>{
    console.log(context.user);
  },[context.user]);
    useEffect(()=>{
      let delay = 0;
      if(count < Object.keys(props.questions).length*3){
        if(count%3 === 2){
          delay = 1500;
          //delay = props.questions[ Math.floor(count/3)].time_per_question*1000;
          setTimeout(() => {
            setView(<RankingList
              key={props.questions[Math.floor(count/3)].id}
              players={props.players}
              user={context.user}
            />)
            setcount(count+1);
          }, delay);
        }
        if(count%3 === 0){
          delay = 1500;
          setTimeout(() => {
            setView(<Questions
              key={props.questions[Math.floor(count/3)].id}
              question={props.questions[ Math.floor(count/3)]}
              answers={props.questions[ Math.floor(count/3)].answers}
              user={context.user}
              score={props.questions[Math.floor(count/3)].points_per_question}
              />);
              setcount(count+1);
          }, delay);
        }
        if(count % 3 === 1){
          
          delay = props.questions[ Math.floor(count/3)].time_per_question*1000;
          setTimeout(() => {
            setView(<Reveal
              answers={props.questions[Math.floor(count/3)].answers}
            />);
              setcount(count+1);
          }, delay);
        }
      }
      // console.log(count);
      // console.log(view);
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