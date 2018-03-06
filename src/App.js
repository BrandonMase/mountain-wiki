import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Utility.css';
import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';
import EntryView from './components/EntryView/EntryView';
import NewEntry from './components/NewEntry/NewEntry';
import {Switch,Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="mainContainer">
            <Route exact path="/" component={LandingPage} />
          <Route path="/entry/:id" component={EntryView} />
          <Route exact path="/editEntry" component={NewEntry}/>
          <Route path="/editEntry/:id" component={NewEntry} />
          
          </div>
        </div>
    );
  }
}

export default App;
