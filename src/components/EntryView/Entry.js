import React, { Component } from 'react';
import './EntryView.css';
export default class Entry extends Component {
  constructor(props) {
    super(props);

  }

  hasEntry() {
    let html = '';
    html = <div className="entryDesc headerText greenColor">
    <a href="#">This question has an entry<div><img src="images/approval.png"/></div></a>
    </div>
  
    return html;
  }
  render() {
    return (
      <div className="entryContainer dp1-bs">
        <div className="entryVotesDiv">
        </div>  
        <div className="entryHeader headerText accentColor">
          <p>This is a sample question bc why not? Super duper long question bc why should it ever be easy to make this responive?</p>
        </div>
        {this.hasEntry()}
        <div className="entryContent bodyText">
          
<p id="entryContentP">
</p>
          </div>
          <div className="entryBottom primaryText">
            <div className="votesContainer">  
              <div className="votesBottom">
                <p className="headerText greenColor">3456</p>
              </div>
              <p className="headerText">Votes</p>
            </div>

            <div className="votesContainer">  
              <div className="votesBottom">
              <p className="headerText redColor">36</p>
              </div>
              <p className="headerText">Answers</p>
            </div>
        
        </div> 
         
        </div>
    );
  }
}