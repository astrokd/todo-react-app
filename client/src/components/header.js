import React from "react";

const Header = ({ value }) => {
  return (
    <header className="App-header">
      <h1 id="header-counter">To Do List | {value} </h1>
    </header>
  );
};

export default Header;
