import React from "react";
import RankingListItem from "./RankingListItem"
export default function RankingList(props){
  let sorted = props.players.sort((a, b)=>{
    return b.score - a.score;
  })
  
  let items = sorted.map((player, index)=>{
    return <ul>
      <RankingListItem 
    key={player.id}
    rank={index+1}
    gamertag={player.gamertag}
    level={props.users[player.user_id].expertise_level}
    />
    </ul>
  })
  return(
    items
  )
}