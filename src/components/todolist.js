import React from "react";

let todo = ["get up", "code", "repeat"];

const ToDoList = () => {
  return (
    <div className="App-todolist">
      <ul>
        {todo.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
