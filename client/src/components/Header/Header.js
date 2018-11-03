import React from "react";
import "./Header.css";

const Header = props => {
  console.log(props);
  return (

<nav className="navbar navbar-light bg-light">
 
  <div className="navbar-text">
    <p className="logo">SL</p>
    
    <p className="phone"> 919.417.0633 </p>
  </div>

</nav>
)}

export default Header;
