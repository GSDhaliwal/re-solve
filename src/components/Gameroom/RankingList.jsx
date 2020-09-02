import React, {useContext} from "react";
import RankingListItem from "./RankingListItem"
import UserContext from "./UserContext"

export default function RankingList(props){

  const context = useContext(UserContext);

  let sorted = props.players.sort((a, b)=>{
    return b.score - a.score;
  })
  
  let items = sorted.map((player, index)=>{
    return <RankingListItem 
    key={player.id}
    gamertag={player.gamertag}
    score={player.score}
    level={player.expertise_level}
    />
  })
  return(
    <ol>
      {items}
    </ol>
    
  )
}