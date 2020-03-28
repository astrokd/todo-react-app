import React, { useState, useEffect, useContext } from "react"
import { Alert, Table, Spinner, Button } from "react-bootstrap"
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
  let [count, setCount] = useState(0);
  const settings = useContext(SettingsContext)
  const [page, setPage] = useState(0);
  let perPageCount = settings.resultsPerPage
  let start = page * perPageCount
  let end = start + perPageCount
  let currentList = todoItems.slice(start, end)

  // const [todoItems, error, isLoading] = useFetch();

  // const [
  //   values,
  // ] = useForm()

  useEffect(() => {
    setCount(todoItems.length);
    console.log('in use effect, perPageCount:',perPageCount)
    start = page * perPageCount
    end = start + perPageCount
    currentList = todoItems.slice(start, end)
    const headerCount = `ToDo App | ${count} item`
    // I don't think I should be doing it this way but...
    document.title = headerCount;
    document.getElementById("header-counter").innerHTML = headerCount
  });
  
  return (
    <div className="App-todolist">
      {error && <Alert variant="danger">{error}</Alert>}
      {isLoading ? <Spinner animation="grow" /> : (
      <>
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
          {currentList.map(item => (
            <tr className={item.status ? "completed d-flex" : "notcompleted d-flex"} key={item.id}>
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
      {page > 0 && <Button className="btn btn-secondary" onClick={() => setPage(page - 1)}>Previous</Button>}
      {todoItems.length > end && <Button className="btn btn-secondary" onClick={() => setPage(page + 1)}>Next</Button>}
      </>
     )
     }
    </div>
  );
}

export default ToDoList;
