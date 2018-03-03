import React, { Component } from 'react';
import './Header.css';
export default class MobileTopHeader extends Component {
  render() {
    return (
      <div className="headerContainer2">
       <div id="MobileTHeader" className="primaryColor dp2-bs">
          <div className="MobileTopHeader"><a className="headerText" href="#topQuestions">Top questions</a></div>
          <div className="MobileTopHeader"><a className="headerText" href="#newEntries">newest entries</a></div>
          <div className="MobileTopHeader"><a className="headerText" href="#newSnippets">top snippets</a></div>
         
        </div>
      </div>
    );
  }
}