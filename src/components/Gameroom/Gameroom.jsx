import React,{useState, useEffect, useContext} from "react";
import RankingList from "./RankingList";
import Questions from "./Question"
import UserContext from "./UserContext"
import Reveal from "./Reveal";


export default function Gameroom(props){
  const [view, setView] = useState();
  const [count, setcount] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [timer, setTimer] = useState(0);
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
              setTimer(props.questions[ Math.floor(count/3)].time_per_question)
              setTimerInterval((OT)=>{
                if(OT){
                  clearInterval(OT);
                }
                return setInterval(() => {
                  setTimer((t)=>t-1);
                }, 1000);;
              })
              setcount(count+1);
          }, delay);
        }
        if(count % 3 === 1){
          delay = props.questions[ Math.floor(count/3)].time_per_question*1000;
          setTimeout(() => {
            setView(<Reveal
              answers={props.questions[Math.floor(count/3)].answers}
            />);
              setTimerInterval((OT)=>{
                clearInterval(OT);
                return null;
              })
              setcount(count+1);
          }, delay);
        }
      }
  },[count]);


  return(
    <section>
  {view}
  {(count%3 === 1) && timer}
    </section>
  )
}