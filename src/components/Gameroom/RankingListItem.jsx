import React from "react";

export default function RankingListItem(props){
  return(
    <li>
      {props.gamertag}
      {" - "}
      {props.score}
    </li>
  )
}