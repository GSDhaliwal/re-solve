import React from "react";
import "./RankingListItem.css"
export default function RankingListItem(props){
  return(
    <li className="rankingItem">
      {props.gamertag}
      {" - "}
      {props.score}
    </li>
  )
}