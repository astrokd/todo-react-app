import React from "react";

const Header = ({ value }) => {
  return (
    <header className="App-header">
      <h1>To Do List | {value} </h1>
    </header>
  );
};

export default Header;
