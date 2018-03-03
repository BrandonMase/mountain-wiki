import React, { Component } from 'react';
import './LandingPage.css';
export default class QuestionDiv  extends Component {
  render() {
    return (
      <div className="newQuestionDiv dp2-bs">
        <div className="mobileVotesDiv lightPrimaryColor">
          <div className="votes primaryText">8765<br /><img className="upAndDownVotes" src="/images/chevron-up.png" /><img className="upAndDownVotes" src="/images/chevron-down.png" /></div>
          <div className="votes primaryText">100<br />A</div>
        </div>
        <div className="votesDiv">
          <div className="votes votesId lightPrimaryColor"><p>8765 <br />votes</p></div>
          <div className="votes answerId accentColor"><p>100 <br />answers</p></div>
        </div>
        <div className="rightQuestionDiv">
          <div className="questionHeaderText"><a href="#">This is a sample question bc why not? Super duper long question bc why should it ever be easy to make this responive?</a></div>
          <div className="questionLabel ">Javascript</div>
          <div className="questionLabel ">Javascript</div>
          <div className="questionDetails">by username 2/3/2016</div>
        </div>
      </div>
    );
  }
}