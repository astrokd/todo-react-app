import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "./components/header";
import Interface from "./components/interface";
import count from "./components/interface";
import Footer from "./components/footer";

export default function App() {
  return (
    <div className="App">
      <Header value={"todos:"} />
      <h4 className="subheader">Add your ToDo items here!</h4>
      <Interface />
      <Footer />
    </div>
  );
}
