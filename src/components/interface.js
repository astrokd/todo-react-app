import React, { useState, useEffect } from "react";

import useFetch from '../hooks/useFetch'
import useForm from '../hooks/useForm'

function Interface() {
  let [count, setCount] = useState(0);
  const [todoItems, error, isLoading] = useFetch();

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

  async function putToDoItem (item) {
    values.status = false;
    const raw = await fetch('http://localhost:3001/items/'+item.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })
    const response = await raw.json();
    console.log(response);
  }

  async function deleteToDoItem (id) {
    const raw = await fetch('http://localhost:3001/items/'+ id, {
      method: 'delete',
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

  const handleDelete = e => {
    deleteToDoItem(e)
    const newCount = count - 1;
    setCount(newCount);
  };

  const handleCompleted = e => {
    e.status = !e.status;
    console.log('in handle Completed -- ',e)
    putToDoItem(e)
  };

  useEffect(() => {
    setCount(todoItems.length);
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
        <div className="App-todolist">
        {error && <div>{error}</div>}
        {isLoading ? <div>Loading</div> : 
        <ul>
          {todoItems.map((item, index) => (
            <li
              className={item.status ? "completed" : "notcompleted"}
              key={item.id}
            >
              <span className="todo">{item.description}</span>
              <span className="diff">DIFFICULTY: {item.difficulty}</span>
              <button onClick={() => handleCompleted(item)}>
                Completed:{item.status.toString()}
              </button>
              <button onClick={() => handleDelete(item.id)}>del</button>
            </li>
          ))}
        </ul>
        }
        </div>
      </div>
    </main>
  );
}

export default Interface;
