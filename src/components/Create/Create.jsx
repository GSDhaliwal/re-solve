import React, { useState, useEffect } from 'react';
import Questions from './Questions';

export default function Create(props){
  const [questions, setQuestions] = useState([1]);
  
  
  let categoryDropDown = props.categories.map(category => {
    return <option value={category.categories_name}>{category.categories_name}</option>
  })

  

  
  useEffect(() => {
    console.log(questions)
  })

  const addQuestion = function() {
     setQuestions([...questions, 1])  
  };
  
  let display = questions.map((question, index) => {
      return <Questions 
        key={index}
        id={index}
      />
  })
 
  return (
    <form>
      <label>
        Game Title:
        <input type="text" name="Game Title" />
        <br/>
        <br/>
        Category:
        <select>
          {categoryDropDown}
        </select>
      </label>
      {display}
      <button type="button" onClick={addQuestion}>Add Question</button>
      <br/>
      <button type="button">Save Draft</button>
      <input type="submit" value="Save/Post" />
   </form>
  )
}

