import React, { useState, useEffect } from "react"
import { Button, Form } from 'react-bootstrap'

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
        <Form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">To Do Description and Difficulty</span>
            </div>
            <input
              type="text"
              id="description"
              name="description"
              aria-label="Description"
              className="form-control"
              onChange={handleChange}
            />
            <input
              type="number"
              id="difficulty"
              name="difficulty"
              aria-label="Difficulty"
              className="form-control"
              onChange={handleChange}
            />
            <input type="submit" value="Add to do item" className="form-control"/>
          </div>
        </Form>
      </div>
    </main>
  );
}

export default Interface;
