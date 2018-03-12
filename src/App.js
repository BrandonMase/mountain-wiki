import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './Utility.css';
import Header from './components/Header/Header';
import LandingPage from './components/LandingPage/LandingPage';
import EntryView from './components/EntryView/EntryView';
import NewEntry from './components/NewEntry/NewEntry';
import Profile from './components/Profile/Profile';
import LogValidator from './components/LogValidator/LogValidator';
import Search from './components/Search/Search';
import {logValidator} from './ducks/reducer';
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux';
import axios from 'axios'


class App extends Component {

  render() {
    return (
      <div>
      <div className="App" onClick={(e) => this.props.state.logValidator ? this.props.logValidator({mousePosX:e.clientX,mousePosY:e.clientY + window.pageYOffset}) : ''}>
          <Header />
        <div className="mainContainer">
          <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/entry/:id" component={EntryView} />
          <Route exact path="/editEntry" component={NewEntry}/>
          <Route path="/editEntry/:id" component={NewEntry} />
          <Route path="/u/:id" component={Profile}/>
          <Route path="/s" component={Search} />
          </Switch>
          
          </div>
        </div>
          {this.props.state.logValidator? <LogValidator childProps={this.props.state} /> : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    state:state,
  }
}
export default connect(mapStateToProps,{logValidator},null,{pure:false})(App)
