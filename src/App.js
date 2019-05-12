import React, { Component } from 'react';
import PlantSelector from './Components/PlantSelector/PlantSelector';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="">
          <h1>Kalendorius </h1>
        </header>

        <div className="main container">
          <PlantSelector />
        </div>

        <footer>
          <p> Kalendorius </p>
        </footer>
      </div>
    );
  }
}

export default App;
