import React, { useState, useEffect } from "react";
import { Container } from 'react-bootstrap'
import "./styles.css";
import Header from "./components/header";
import Interface from "./components/interface";
import Footer from "./components/footer";
import ToDoList from "./components/todolist";

export default function App() {
  return (
    <Container className="App">
      <Header value={"todos:"} />
      <h4 className="subheader">Add your ToDo items here!</h4>
      <Interface />
      <ToDoList />
      <Footer />
    </Container>
  );
}
