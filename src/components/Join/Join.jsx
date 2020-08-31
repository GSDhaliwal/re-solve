import React, { useState, useEffect } from 'react';


export default function Create(props){
  
 
  return (
    <div>
      <p>Some picture will go here</p>
      <form>
      <label>
        <input type="text" name="name" placeholder="Input Game Room Code" />
      </label>
      <br/>
      <input type="submit" value="Enter" />
      </form>


   </div>
  )
}

