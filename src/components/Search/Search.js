import React, { Component } from 'react';
import { connect } from 'react-redux';
import magnify from './../../assets/magnify.png'
import './Search.css'
import {searchResults} from './SearchResults';
class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: null,
      showDrop:true,
      searchSelector:"newest",
    }

    this.searchSelector = this.searchSelector.bind(this);
  }

  huh(){
              {/* <ul className="headerText dp1-bs">
            <li>newest</li>
            <li id="hover" onClick={() => this.setState({showDrop:!this.state.showDrop})}>type</li>

            <li>votes</li>
            <li>unanswered</li>
            {this.state.showDrop ?
            <ul className="drop">
                <li>entry</li>
                <li>question</li>
                <li>snippet</li>
              </ul>: ''} */}
  }

  searchSelector(){
    let html = [];

   

     html.push(this.state.searchSelector === "newest" ? <li className="lightPrimaryColor filter">newest</li> : <li className="filter" onClick={() => this.setState({searchSelector:"newest",showDrop:false})}>newest</li>);
     html.push(this.state.searchSelector === "votes" ? <li className="lightPrimaryColor filter">votes</li> : <li className="filter" onClick={() => this.setState({searchSelector:"votes",showDrop:false})}>votes</li>);
     html.push(this.state.searchSelector === "unanswered" ? <li className="lightPrimaryColor filter">unanswered</li> : <li className="filter" onClick={() => this.setState({searchSelector:"unanswered",showDrop:false})}>unanswered</li>);
    //  html.push(<ul>);
     html.push(<li>entry</li>);
     html.push(<li>question</li>);
     html.push(<li>snippet</li>); 
    //  html.push(</ul>);

    // if(this.state.searchSelector === "newest"){
    //   html.push(<li className="lightPrimaryColor">newest</li>)
    // }
    // else{
    //   html.push(<li onCLick={() => this.setState({searchSelector:"newest"})}>newest</li>)
    // }
    

    return html;
  }
  render() {
    return (
      <div className="superMainSearchContainer">
        <div className="mainSearchContainer">
          <div className="searchBox">
            <input className="bodyText" placeholder="Search for something" /><div className="accentColor"><img src={magnify} /></div>
          </div>
        </div>

        <div className="searchFilters">
        <ul className="headerText dp1-bs">
          {this.searchSelector()}
        </ul>
        </div>
      </div>
    );
  }
}

export default connect()(Search)