import React, { useState, useEffect, useContext } from "react"
import { Alert, Table, Button } from "react-bootstrap"

import useFetch from '../hooks/useFetch'
import useForm from '../hooks/useForm'

function ToDoList({ todoItems, error, isLoading }) {
  let [count, setCount] = useState(0);
  // const [todoItems, error, isLoading] = useFetch();

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
          <tr className="d-flex">
            <th className="text-left flex-sm-grow-1">To Do Description</th>
            <th className="flex-grow-*">Assigned</th>
            <th>Difficulty</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map(item => (
            <tr
              className={item.status ? "completed d-flex" : "notcompleted d-flex"}
              key={item.id}
            >
              <td className="text-left flex-sm-grow-1">{item.description}</td>
              <td className="flex-grow-*">{item.assigned}</td>
              <td>{item.difficulty}</td>
              <td><Button className="btn btn-secondary" onClick={() => handleCompleted(item)}>
               Completed:{item.status.toString()}
             </Button></td>
              <td><Button className="btn btn-warning" onClick={() => handleDelete(item.id)}>del</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      }
    </div>
  );
}

export default ToDoList;
