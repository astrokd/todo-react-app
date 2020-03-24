import React, { useState, useEffect } from "react";

function Interface() {
  let [todoItems, setToDoItems] = useState([]);
  const [newItem, setNewItem] = useState({});
  let [count, setCount] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    newItem.completed = false;
    console.log("in submit:", Object.values(newItem));
    setToDoItems([...todoItems, newItem]);
    const newCount = count + 1;
    setCount(newCount);
    e.target.reset();
    setNewItem({});
  };

  const handleChangeofToDo = e => {
    newItem.todo = e.target.value;
    // setNewItem(newItem);
  };

  const handleChangeofDifficulty = e => {
    newItem.difficulty = e.target.value;
    // setNewItem(newItem);
  };

  const handleDelete = e => {
    todoItems.splice(e, 1);
    setToDoItems([...todoItems]);
    const newCount = count - 1;
    setCount(newCount);
  };

  const handleCompleted = e => {
    todoItems[e].completed = !todoItems[e].completed;
    setToDoItems([...todoItems]);
  };

  useEffect(() => {
    document.title = `ToDo App | ${count} item`;
  });

  return (
    <main className="Interface">
      <title>To Do List | {count}</title>
      <div className="App-form">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>To Do List input:</legend>
            <label htmlFor="listitem">To Do item:</label>
            <input
              onChange={handleChangeofToDo}
              type="text"
              id="listitem"
              name="listitem"
            />
            <label htmlFor="difficulty">Difficulty:</label>
            <input
              onChange={handleChangeofDifficulty}
              type="number"
              id="difficulty"
              name="difficulty"
            />
            <input type="submit" value="Add to do item" />
          </fieldset>
        </form>
        <div className="App-todolist">
          <ul>
            {todoItems.map((item, index) => (
              <li
                className={item.completed ? "completed" : "notcompleted"}
                key={index}
              >
                <span className="todo">{item.todo}</span>
                <span className="diff">DIFFICULTY: {item.difficulty}</span>
                <button onClick={() => handleCompleted(index)}>
                  Completed:{item.completed.toString()}
                </button>
                <button onClick={() => handleDelete(index)}>del</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Interface;
