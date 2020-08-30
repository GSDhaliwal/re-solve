import React from "react";

export default function RankingListItem(props){
  return(
    <li>
      {props.rank}
      {". "}
      {props.gamertag}
      {" "}
      {props.level}
    </li>
  )
}