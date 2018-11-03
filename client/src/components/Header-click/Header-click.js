import React from "react";
import "./Header.css";

const Header = props => {
  console.log(props);
  return (

<nav className="navbar navbar-light bg-light sticky-top">
 
  <div className="navbar-text">
    <p>Clicky Game!</p>
    
    <p className="score">Score: {props.count} |
    Top Score: {props.high} </p>
  </div>

</nav>
)}

export default Header;
