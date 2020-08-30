import React from 'react';
import Questions from './Questions';

export default function Create(props){
  let categoryDropDown = props.categories.map(category => {
    return <option value={category.categories_name}>{category.categories_name}</option>
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
      <Questions />
      <input type="submit" value="Submit" />
   </form>
  )
}

