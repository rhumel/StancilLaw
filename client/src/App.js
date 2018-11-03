import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
// import Header from "./components/Header";
import Nav from "./components/navbar"

import './App.css';

import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Trusts from "./pages/Trusts";
import About from "./pages/About";
import Contact from "./pages/Contact";

class App extends Component {
  state = {
    currentPage: ""
  };

  //Pass the page to state 
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  componentDidMount() {
    this.render();
  }

  render() {
    return (
      <Router>
        <div>
          <Nav
            handlePageChange={this.handlePageChange} currentPage={this.state.currentPage}
          />
          <Route exact path="/home" component={Home} />
          <Route exact path="/trusts" component={Trusts} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/articles" component={Articles} />
          <Route exact path="/about" component={About} />
          <Route path="/" component={Home} />
        </div>
        {/* <Footer /> */}
      </Router>
    );
  }
}

export default App;
