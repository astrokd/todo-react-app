import React, { useState, useEffect } from "react"
import { Alert, Spinner, Table } from "react-bootstrap"

import useFetch from '../hooks/useFetch'
import useForm from '../hooks/useForm'

function ToDoList() {
  let [count, setCount] = useState(0);
  const [todoItems, error, isLoading] = useFetch();

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
    values,
  ] = useForm()

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
    // setCount(todoItems.length);
    document.title = `ToDo App | ${count} item`;
  });
  
  return (
    <div className="App-todolist">
      {error && <Alert variant="danger">{error}</Alert>}
      {isLoading ? <div>Loading</div> : 
      <Table striped size="sm">
        <thead className="thead-dark">
          <tr>
            <th>To Do Description</th>
            <th>Assigned</th>
            <th>Difficulty</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map(item => (
            <tr>
              <td>{item.description}</td>
              <td>{item.assigned}</td>
              <td>{item.difficulty}</td>
              <td><button onClick={() => handleCompleted(item)}>
               Completed:{item.status.toString()}
             </button></td>
              <td><button onClick={() => handleDelete(item.id)}>del</button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      }
    </div>
  );
}

export default ToDoList;
