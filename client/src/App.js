import React, { useState, useEffect } from "react";
import { Container } from 'react-bootstrap'
import "./styles.css";
import Header from "./components/header";
import Interface from "./components/interface";
import Footer from "./components/footer";
import ToDoList from "./components/todolist";
import Settings from './context/Settings';
import PaginationSetter from './components/pagination'

import useFetch from './hooks/useFetch'

export default function App() {
  const [count,todoItems,error,isLoading,addNewToDoItem,deletionHandler,completionHandler] = useFetch()
  return (
    <Settings>
      <Container className="App">
        <Header value={`todos:${count}`} />
        <span>This is the ToDo app</span>
        <Interface addNewToDoItem={addNewToDoItem} />
        <ToDoList 
          todoItems={todoItems}
          isLoading={isLoading}
          error={error}
          addNewToDoItem={addNewToDoItem}
          deletionHandler={deletionHandler}
          completionHandler={completionHandler}
        />
        <PaginationSetter />
        <Footer />
      </Container>
    </Settings>
  );
}