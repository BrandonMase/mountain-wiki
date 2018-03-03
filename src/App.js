import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Utility.css';
import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';
import EntryView from './components/EntryView/EntryView';
import NewEntry from './components/NewEntry/NewEntry';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="mainContainer">
          <NewEntry/>
          </div>
        </div>
    );
  }
}

export default App;
