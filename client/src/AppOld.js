import React, { Component } from 'react';
import FamilyCard from "./components/FamilyCard";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import families from "./families.json"
import './App.css';

class App extends Component {
  state = {
    families: [],
    count: 0,
    high: 0,
    clicked: []
  };

  //shuffle the initial file. 
  componentDidMount() {
    this.setState({ families: this.shuffle(families) })

  }
  goodClick = () => {

    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);

    if (this.state.count === 12) {
      this.endGame();
    }
  }

  // 
  //  User selected a tile that WAS selected before.
  //  If count is more than the High score, then move the 
  //  count value into high.  Otherwise reset count.
  // 
  endGame = () => {
    if (this.state.count >= this.state.high) {
      this.setState({
        high: this.state.count,
        count: 0,
        clicked: []
      });
    } else {
      this.setState({
        count: 0,
        clicked: []
      });
    }
  }


//execute if tile is selected
  itsBeenClicked = (id) => {
    // console.log("clicked");
    // console.log(id);

    // shuffle after click
    this.setState({
      families: this.shuffle(this.state.families)
    });

    // move a copy of the current state and id object into new field 
    const { clicked } = this.state;
    const newClicked = { id };

    //use index to go through array and compare the id to the new id
    // if id's match, append to clicked array
    // 
    if (clicked.findIndex(i => i.id === id) < 0) {
      // console.log("not array");
      clicked.push(newClicked);
      this.setState({ clicked })
      this.goodClick();
    } else {
      this.endGame();
    }
  }


  render() {
    return (
      <Wrapper>
        <Header
          count={this.state.count}
          high={this.state.high}
        />

        <div className="container">
          {this.state.families.map(family => (
            // process each record of the families.json file

            <FamilyCard

              id={family.id}
              key={family.id}
              name={family.id}
              image={family.image}
              onClick={this.itsBeenClicked}
            />

          ))}
        </div>
      </Wrapper>
    );
  }
}

export default App;
