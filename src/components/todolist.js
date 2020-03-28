import React, { useState, useEffect, useContext } from "react"
import { Alert, Table, Button } from "react-bootstrap"
import { SettingsContext } from '../context/Settings'
import useForm from '../hooks/useForm'

function ToDoList({ 
  todoItems, 
  error, 
  isLoading, 
  addNewToDoItem, 
  deletionHandler,
  completionHandler,
}) {
  const settings = useContext(SettingsContext)
  let [count, setCount] = useState(0);
  // const [todoItems, error, isLoading] = useFetch();

  const [
    values,
  ] = useForm()

  useEffect(() => {
    setCount(todoItems.length);
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
            <th>Completion Status</th>
            <th>delete</th>
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
              <td><Button className="btn btn-secondary" onClick={() => completionHandler(item)}>
               Completed:{item.status.toString()}
             </Button></td>
              <td><Button className="btn btn-warning" onClick={() => deletionHandler(item.id)}>del</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      }
    </div>
  );
}

export default ToDoList;
