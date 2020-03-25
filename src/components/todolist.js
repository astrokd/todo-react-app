import React from "react";

import useFetch from '../hooks/useFetch'

const ToDoList = () => {
  const [todoItems, error, isLoading] = useFetch()
  return (
    <div className="App-todolist">
      {error && <div>{error}</div>}
      {isLoading ? <div>Loading</div> : 
      <ul>
        {todoItems.map((item, index) => (
          <li
            className={item.status ? "completed" : "notcompleted"}
            key={id}
          >
            <span className="todo">{item.description}</span>
            <span className="diff">DIFFICULTY: {item.difficulty}</span>
            <button onClick={() => handleCompleted(index)}>
              Completed:{item.status.toString()}
            </button>
            <button onClick={() => handleDelete(index)}>del</button>
          </li>
        ))}
      </ul>
      }
    </div>
  );
};

export default ToDoList;
