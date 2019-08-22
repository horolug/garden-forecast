import React, { Component } from 'react';
import PlantSelector from './Components/PlantSelector/PlantSelector';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="mb-4">
          <a href="/"> 
            <h1> Kalendorius </h1>
          </a>
        </header>

        <div className="main container mt-4 mb-4">
          <PlantSelector />
        </div>

        <footer className="mt-4">
          <a href="/">
            <p> Kalendorius </p>
          </a> 
        </footer>
      </div>
    );
  }
}

export default App;
