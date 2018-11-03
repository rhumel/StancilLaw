import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavItem, Modal } from 'react-materialize';
import "./navbar.css";

// Need to add conditional...if user is logged in load dropdownB, if not, load A
export default class NavBar extends React.Component {
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  
  };
  render() {
    return (
      <Navbar brand='Unity' right>
        <NavItem
          onClick={() => this.props.handlePageChange("Search")}
          className={this.props.currentPage === "Search" ? "active" : "deactive"}>
          <Link to="/search"> Search </Link>
        </NavItem>
        <NavItem>
          <Modal
            header='Log In'
            trigger={<div>Log In</div>}>
            <form onSubmit={this.handleSubmit}>
              <h4> Username: </h4>
              <input
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange('username')}
              >
              </input>
              <br></br>
              <h4> Password: </h4>
              <input
                name="password"
                type="text"
                value={this.state.password}
                onChange={this.handleChange('password')}
              >
              </input>
              <button type="submit" className="formSubmit"> Log In </button>
            </form>
          </Modal>
        </NavItem>
        <NavItem><div> Username</div></NavItem>
        <NavItem          
          onClick={() => this.props.handlePageChange("Profile")}
          className={this.props.currentPage === "Profile" ? "active" : "deactive"}>
          <Link to="/profile"> Profile </Link>
        </NavItem>
        <NavItem onClick={this.props.handleLogout}><div> Sign Out </div> </NavItem>
      </Navbar>
    );
  };
