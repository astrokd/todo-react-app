import React, { useState, useEffect } from "react";
import { Container } from 'react-bootstrap'
import "./styles.css";
import Header from "./components/header";
import Interface from "./components/interface";
import Footer from "./components/footer";
import ToDoList from "./components/todolist";
import Settings from './context/Settings';
import PaginationSetter from './components/pagination'

import AuthRules from './context/AuthRules'
import LoginForm from './components/LoginForm'
import Auth from './components/Auth'

import useFetch from './hooks/useFetch'

export default function App() {
  const [count,todoItems,error,isLoading,addNewToDoItem,deletionHandler,completionHandler] = useFetch()
  return (
    <AuthRules>
      <Settings>
        <Container className="App">
          <LoginForm />
          <hr />
          <Auth>
            <Header value={`todos:${count}`} />
            <span>This is the ToDo app</span>
            <Auth permission="create">
              <Interface addNewToDoItem={addNewToDoItem} />
            </Auth>
            <ToDoList 
              todoItems={todoItems}
              isLoading={isLoading}
              error={error}
              addNewToDoItem={addNewToDoItem}
              deletionHandler={deletionHandler}
              completionHandler={completionHandler}
            />
            <PaginationSetter />
          </Auth>
          <Footer />
        </Container>
      </Settings>
    </AuthRules>
  );
}
