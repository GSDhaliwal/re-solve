import React from "react";


export default function Ranking(props){
  
  return(
    <RankingList
    key={props.round}
    players={sorted}
    />
  )
}