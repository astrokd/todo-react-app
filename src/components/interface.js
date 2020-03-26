import React, { useState, useEffect } from "react";

import useForm from '../hooks/useForm'

function Interface() {
  let [count, setCount] = useState(0);

  async function postToDoItem () {
    values.status = false;
    values.assigned = "Kevin";
    const raw = await fetch('http://localhost:3001/items', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    const response = await raw.json();
    console.log(response);
  }

  const [
    handleSubmit,
    handleChange,
    handleTextInput,
    values,
  ] = useForm(postToDoItem)

  useEffect(() => {
    // setCount(todoItems.length);
    document.title = `ToDo App | ${count} item`;
  });

  
  return (
    <main className="Interface">
      <title>To Do List | {count}</title>
      <div className="App-form">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>To Do List input:</legend>
            <label htmlFor="description">To Do item:</label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleChange}
            />
            <label htmlFor="difficulty">Difficulty:</label>
            <input
              type="number"
              id="difficulty"
              name="difficulty"
              onChange={handleChange}
            />
            <input type="submit" value="Add to do item" />
          </fieldset>
        </form>
      </div>
    </main>
  );
}

export default Interface;
