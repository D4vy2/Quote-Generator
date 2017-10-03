import React, { Component } from 'react';
import logo from './logo.svg';
import { Quote } from './components/Quote';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title" style={{fontFamily: 'monospace'}}>Quote Generator</h1>
        </header>
        <Quote/>
      </div>
    );
  }
}

export default App;